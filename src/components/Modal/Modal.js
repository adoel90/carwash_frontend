import React from 'react';
import ReactDOM from 'react-dom';

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.togglePortal = this.togglePortal.bind(this);
		this.renderChildren = this.renderChildren.bind(this);
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.destroy = this.destroy.bind(this);
		this.handleBackdropClick = this.handleBackdropClick.bind(this);
	}

	componentDidMount = () => {
		const { isOpen } = this.props;

		if(isOpen) {
			this.togglePortal();
		}
	}

	componentDidUpdate = (prevProps) => {
		if(this.props.isOpen !== prevProps.isOpen) {
			this.togglePortal();
		} else if(this._element) {
			this.renderIntoSubtree();
		}
	}

	componentWillUnmount() {
		this.destroy();
	}

	togglePortal = () => {
		if(this.props.isOpen) {
			this.showModal();
		} else {
			this.hideModal();
		}
	}

	showModal = () => {
		this._element = document.createElement('div');
		document.body.appendChild(this._element);

		this.renderIntoSubtree();
	}

	hideModal = () => {
		this.destroy();
	}

	destroy = () => {
		console.log(123);

		if(this._element) {
			ReactDOM.unmountComponentAtNode(this._element);
			document.body.removeChild(this._element);
			this._element = null;
		}
	}

	renderIntoSubtree = () => {
		ReactDOM.unstable_renderSubtreeIntoContainer(
			this,
			this.renderChildren(),
			this._element
		);
	}

	handleBackdropClick = () => {
		this.props.toggle();
	}

	renderChildren = () => {
		const {
			isOpen,
			children,
			toggle
		} = this.props;

		console.log(this.props.isOpen);

		return (
			<div>
				<div className="modal">
					{children}
				</div>
				<div className="modal-backdrop" onClick={this.handleBackdropClick} />
			</div>
		);
	}

	_element = null;

	render() {
		return null;
	}
}

export default Modal;
