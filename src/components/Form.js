import React from 'react';

class Form extends React.Component {
	render() {
		return (
			<form className="form">
				{this.props.children}
			</form>
		)
	}
}

export default Form;
