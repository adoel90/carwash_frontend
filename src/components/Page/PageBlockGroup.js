import React, { Component } from 'react';

class PageBloc extends Component {

	render() {
		const {
			children
		} = this.props;

		return (
			<div className="page-block-group">
				{ children }
			</div>
		);
	}

}

export default PageBloc;
