import React from 'react';
import classNames from 'classnames';
import { Form, FormGroup } from '../components/Form';
import { Input, InputGroup, InputAddon } from '../components/Input';

class SearchBar extends React.Component {
	render() {
		const {
			placeholder,
			className,
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
						<i className="icon icon--base fi flaticon flaticon-search-1"></i>
					</InputAddon>
					<Input type="text" placeholder={placeholder} onChange={onChange} />
				</InputGroup>
			</Form>
		)
	}
}

export default SearchBar;
