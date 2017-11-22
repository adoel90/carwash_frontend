import React from 'react';
import { Redirect } from 'react-router-dom';

import { Container, Row } from '../Grid';
import { PageBlock } from '../Page';
import { PropsRoute } from '../Route';
import { ModalDialog } from '../Modal';

import MainSidenav from '../MainSidenav';
import { AdminSidebar } from '../Admin/index';

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

		let firstRoute = subroutes[0].name.replace(/\s+/g, '-').toLowerCase();

		return <Redirect to={`${match.url}/${firstRoute}`} />
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

		const firstRoutePath = subroutes[0].name.replace(/\s+/g, '-').toLowerCase();

		console.log(dialog);

		return (
			<main className="main main--has-subheader">
				<div style={{ padding: '30px' }}>
					<Row>
						<div className="column-3">
							<AdminSidebar
								navigations={subroutes}
							/>
						</div>
						<div className="column-9">
							{ subroutes.map(this.renderSubroutes) }
						</div>
					</Row>
				</div>
				{ this.handleSubrouteRedirect() }
				{ dialog.isOpen ? this.renderDialog() : null }
			</main>
		);
	}

}

export default Settings;
