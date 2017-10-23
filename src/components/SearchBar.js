import React from 'react';
import Button from '../components/Button';

class SearchBar extends React.Component {
	render() {
		return (
			<form className="search-bar">
				<div className="search-bar-group">
					<div className="search-bar-addon">
						{ this.props.addon }
					</div>
					<input
						type="text"
						className="search-bar-control"
						placeholder={this.props.placeholder}
					/>
				</div>
			</form>
		)
	}
}

export default SearchBar;
