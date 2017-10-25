import React from 'react';
import classNames from 'classnames';
import { Form, FormGroup } from '../components/Form';
import { Input, InputGroup } from '../components/Input';

class SearchBar extends React.Component {
	render() {
		return (
			<Form className={`search-bar`}>
				<FormGroup row>
					<InputGroup>
						<Input type="text" placeholder="Cari menu..." />
					</InputGroup>
				</FormGroup>
			</Form>
		)
	}
}

export default SearchBar;
