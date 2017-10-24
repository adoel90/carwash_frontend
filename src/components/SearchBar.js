import React from 'react';

import Form from '../components/Form';
import FormText from '../components/FormText';

class SearchBar extends React.Component {
	render() {
		return (
			<Form className="search-bar">
				<div className="search-bar-group">
					<div className="search-bar-addon">
						<i className="fi flaticon flaticon-search-1"></i>
					</div>
					<input
						type="text"
						className="search-bar-control"
						placeholder={this.props.placeholder}
					/>
				</div>
			</Form>
		)
	}
}

export default SearchBar;
