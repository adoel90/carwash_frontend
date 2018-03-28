import React from 'react';
import classNames from 'classnames';
import { Form, FormGroup } from '../components/Form';
import { Input, InputGroup, InputAddon } from '../components/Input';
// import { Input, InputGroup, InputAddon } from '../components/Input';
// import { Row } from '../components/Grid';
import { Row } from '../layouts/Grid';

class SearchBar extends React.Component {
	render() {
		const {
			placeholder,
			className,
			name,
			value,
			onSubmit,
			onChange,
			onSearchChange,
			searchBy,
			searchParams,
		} = this.props;

		const classes = classNames(
			"search-bar",
			className
		)

		const searchOptions = () => {
			if(searchParams) {				
				return (
					<Input
						type="select"
						name="searchBy"
						style={{width: '50%'}}
						onChange={onSearchChange}>
						<option disabled="true" selected="true">Cari berdasarkan...</option>
						{searchParams.map((item) => {
							return <option value={item.accessor} selected={item.accessor == searchBy}>{item.name}</option>
						})}
					</Input>
				)
			}
		}

		return (
			<Form onSubmit={onSubmit} className={classes}>
				<InputGroup>
					{/* <InputAddon>
						<i className="ion-search icon icon--base"></i>
					</InputAddon> */}
					<InputGroup>
						<Input
							name="searchText"
							type="text"
							placeholder={placeholder} 
							value={value} 
							onChange={onChange} 
						/>
						{ searchOptions() }
					</InputGroup>
				</InputGroup>
			</Form>
		)
	}
}

export default SearchBar;