import React from 'react';
import { Redirect } from 'react-router-dom';

import { Container, Row } from '../Grid';
import { PageBlock } from '../Page';
import { PropsRoute } from '../Route';
import { ModalDialog } from '../Modal';

import MainSidenav from '../MainSidenav';

class Settings extends React.Component {
	constructor() {
		super();
		this.renderSubroutes = this.renderSubroutes.bind(this);
		this.renderDialog = this.renderDialog.bind(this);
		this.handleRedirect = this.handleRedirect.bind(this);
	}

	componentDidUpdate = () => {
		this.handleRedirect();
	}

	handleRedirect = () => {
		const {
			dialog,
			match,
			subroutes
		} = this.props;

		let firstRoute = subroutes[0].name.replace(/\s+/g, '-').toLowerCase();

		return <Redirect from="/*" to={`${match.url}/${firstRoute}`} />
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
				// toggle={toggleDialog}
				type={dialog.type}
				title={dialog.title}
				message={dialog.message}

				confirmText={dialog.confirm ? dialog.confirmText : null}
				cancelText={dialog.cancel ? dialog.cancelText : null}
				closeText={dialog.close ? dialog.closeText : null}

				onConfirm={dialog.confirm ? dialog.confirm : null}
				onCancel={dialog.cancel ? toggleDialog : null}
				onClose={dialog.close ? dialog.close : null}
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
							{ this.handleRedirect() }
						</div>
					</Row>
				</Container>
				{ dialog.isOpen ? this.renderDialog() : null }
			</main>
		);
	}

}

export default Settings;
