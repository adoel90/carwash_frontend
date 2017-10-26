import React from 'react';
import classNames from 'classnames';
import { Form, FormGroup } from '../components/Form';
import { Input, InputGroup, InputAddon } from '../components/Input';

class SearchBar extends React.Component {
	render() {
		const {
			className
		} = this.props;

		const classes = classNames(
			"search-bar",
			className
		)

		return (
			<Form className={classes}>
				<InputGroup>
					<InputAddon>
						<i className="icon icon--base fi flaticon flaticon-search-1"></i>
					</InputAddon>
					<Input type="text" placeholder="Cari menu..." />
				</InputGroup>
			</Form>
		)
	}
}

export default SearchBar;
