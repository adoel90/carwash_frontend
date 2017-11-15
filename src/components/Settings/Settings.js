import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Container, Row } from '../Grid';
import { PageBlock } from '../Page';
import { PropsRoute } from '../Route';
import { ModalDialog } from '../Modal';

import MainSidenav from '../MainSidenav';

class Settings extends Component {
	constructor() {
		super();
		this.renderSubroutes = this.renderSubroutes.bind(this);
		this.renderDialog = this.renderDialog.bind(this);
	}

	componentDidMount = () => {

	}

	renderDialog = () => {
		const {
			dialog,
			dispatch,
			toggleDialog,
			isDialogOpen
		} = this.props;

		return (
			<ModalDialog
				isOpen={dialog.isOpen}
				toggle={toggleDialog}
				type={dialog.type}
				title={dialog.title}
				message={dialog.message}
				onConfirm={dialog.confirm}
				onCancel={toggleDialog}
				confirmText={dialog.confirmText}
				cancelText={dialog.cancelText}
			/>
		)
	}

	renderSubroutes = (route, i) => {
		const { match } = this.props;
		const path = route.name.replace(/\s+/g, '-').toLowerCase();

		return (
			<PropsRoute
				key={i}
				path={`${match.url}/${path}`}
				component={route.component}
				{...this.props}
			/>
		)
	}

	render() {
		const {
			dialog,
			match,
			subroutes
		} = this.props;

		const firstRoutePath = subroutes[0].name.replace(/\s+/g, '-').toLowerCase();

		console.log(dialog);

		return (
			<main className="main main--has-subheader">
				<Container className="padding-top-3 padding-bottom-5">
					<Row>
						<div className="column-2">
							<aside className="sidebar">
								<MainSidenav items={ this.props.subroutes } basePath={match.path} />
							</aside>
						</div>
						<div className="column-10">
							{ subroutes.map(this.renderSubroutes) }
							<Redirect from={match.url} to={`${match.url}/${firstRoutePath}`} />
						</div>
					</Row>
				</Container>
				{ dialog.isOpen ? this.renderDialog() : null }
			</main>
		);
	}

}

export default Settings;
