import React from 'react';
import classNames from 'classnames';
import { Form, FormGroup } from '../components/Form';
import { Input, InputGroup, InputGroupAddon } from '../components/Input';

class SearchBar extends React.Component {
	render() {
		return (
			<Form className={`search-bar`}>
				<InputGroup>
					<InputGroupAddon>
						<i className="fi flaticon flaticon-search-1"></i>
					</InputGroupAddon>
					<Input type="text" placeholder="Cari menu..." />
				</InputGroup>
			</Form>
		)
	}
}

export default SearchBar;
