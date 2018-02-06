import React from 'react';
import classNames from 'classnames';

class CafeFooter extends React.Component {
	constructor() {
		super();
		this.state = {
			scrollDirection: '',
			lastScrollPosition: 0
		}
		this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount = () => {
		window.addEventListener('scroll', this.handleScroll);
	}

	handleScroll = (event) => {
		const { scrollDirection, lastScrollPosition } = this.state;

		if(lastScrollPosition > event.currentTarget.scrollTop) {
			this.setState({
				direction: 'top',
				lastScrollPosition: event.currentTarget.scrollTop
			})
		} else if(lastScrollPosition < event.currentTarget.scrollTop) {
			this.setState({
				direction: 'bottom',
				lastScrollPosition: event.currentTarget.scrollTop
			})
		}
	}

	render() {
		const { children, className } = this.props;
		const classes = classNames(
			'inner-view-footer',
			className
		)

		return (
			<footer className={classes}>
				{children}
			</footer>
		)
	}
}

export default CafeFooter;
