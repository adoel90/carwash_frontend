import React, { Component } from 'react';
import classNames from 'classnames';
import { Form, FormGroup } from '../../layouts/Form';
import { Input, InputGroup, InputAddon, Select } from '../Input';
// import { Row } from '../Grid';

class SearchBar extends Component {
	
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
			searchParams
		} = this.props;

		const classes = classNames(
			"search-bar",
			className
		)

		const searchOptions = () => {
			if(searchParams) {
				return (
					<Select
						type="select"
						name="searchBy"
						style={{width: '50%', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', padding: '10px' }}
						onChange={onSearchChange}>
						<option disabled="true" selected="true">Cari berdasarkan...</option>
						{searchParams.map((item) => {
							return <option value={item.accessor} selected={item.accessor == searchBy}>{item.name}</option>
						})}
					</Select>
				)
			}
		}

		return (
			<Form onSubmit={onSubmit} className={`${classes}`}>
                <InputGroup>
                    <InputAddon>
                        <i className="fas fa-search"></i>
                    </InputAddon>
                    <Input
                        name="searchText"
                        placeholder={placeholder} 
                        value={value} 
                        onChange={onChange} 
                        style={{borderTopRightRadius: '0px', borderBottomRightRadius: '0px'}}
                    />
                    { searchOptions() }
                </InputGroup>
			</Form>
		)
	}
}

export default SearchBar;