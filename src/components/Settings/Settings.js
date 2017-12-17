import React from 'react';
import { Redirect } from 'react-router-dom';

import { Container, Row } from '../Grid';
import { PageBlock } from '../Page';
import { PropsRoute } from '../Route';
import { ModalDialog } from '../Modal';

// import MainSidenav from '../MainSidenav';
import { AdminSidebar } from '../Admin';

class Settings extends React.Component {
	constructor() {
		super();
		this.renderSubroutes = this.renderSubroutes.bind(this);
		this.renderDialog = this.renderDialog.bind(this);
		this.handleSubrouteRedirect = this.handleSubrouteRedirect.bind(this);
	}

	handleSubrouteRedirect = () => {
		const {
			dialog,
			match,
			subroutes
		} = this.props;

		// let firstRoute = subroutes[0].name.replace(/\s+/g, '-').toLowerCase();
		let firstRoutePath = subroutes.default[0].path;

		return <Redirect to={firstRoutePath} />
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
				isOpen={dialog.isOpened}
				toggle={toggleDialog}
				type={dialog.data.type}
				title={dialog.data.title}
				message={dialog.data.message}
				onConfirm={dialog.data.onConfirm}
				onClose={dialog.data.onClose}
				confirmText={dialog.data.confirmText}
				closeText={dialog.data.closeText}
			/>
		)
	}

	renderSubroutes = (route, i) => {
		const { match } = this.props;

		return (
			<PropsRoute
				key={i}
				path={route.path}
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

		return (
			<main className="main main--has-subheader">
				<div style={{ padding: '30px' }}>
					<Row>
						<div className="column-3">
							<div className="margin-bottom-3">
								<AdminSidebar navigations={subroutes.default} />
							</div>
							<div>
								<AdminSidebar navigations={subroutes.admin} />
							</div>
						</div>
						<div className="column-9">
							{ subroutes.default.map(this.renderSubroutes) }
							{ subroutes.admin.map(this.renderSubroutes) }
						</div>
					</Row>
				</div>
				{ this.handleSubrouteRedirect() }
				{ dialog.isOpened ? this.renderDialog() : null }
			</main>
		);
	}

}

export default Settings;
