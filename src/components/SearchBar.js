import React from 'react';
import classNames from 'classnames';
import { Form, FormGroup } from '../components/Form';
import { Input, InputGroup, InputAddon } from '../components/Input';

class SearchBar extends React.Component {
	render() {
		const {
			placeholder,
			className,
			name,
			value,
			onSubmit,
			onChange
		} = this.props;

		const classes = classNames(
			"search-bar",
			className
		)

		return (
			<Form onSubmit={onSubmit} className={classes}>
				<InputGroup>
					<InputAddon>
						<i className="ion-search icon icon--base"></i>
					</InputAddon>
					<Input 
						type="text" 
						name={name} 
						placeholder={placeholder} 
						value={value} 
						onChange={onChange} 
					/>
				</InputGroup>
			</Form>
		)
	}
}

export default SearchBar;
