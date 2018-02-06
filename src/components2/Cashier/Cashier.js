import React from 'react';
import { Redirect } from 'react-router-dom';

import { Container, Row } from '../Grid';
import { PropsRoute } from '../Route';
import { ModalDialog } from '../Modal';
import MainSidenav from '../MainSidenav';


class Cashier extends React.Component {
	constructor() {
		super();
		this.renderSubRoutes = this.renderSubRoutes.bind(this);
		this.renderDialog = this.renderDialog.bind(this);
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

	renderSubRoutes = (route, i) => {
		const { match, user } = this.props;
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
		const { subRoutes, match } = this.props;
		const firstRoutePath = subRoutes[0].name.replace(/\s+/g, '-').toLowerCase();

		return (
			<main className="main main--has-subheader">
				<Container className="padding-top-3 padding-bottom-3">
					<Row>
						<div className="column-2">
							<aside className="sidebar">
								<MainSidenav items={this.props.subRoutes} basePath={match.path} />
							</aside>
						</div>
						<div className="column-10">
							{subRoutes.map(this.renderSubRoutes)}
							{/* <Redirect from={match.url} to={`${match.url}/${firstRoutePath}`} /> */}
							<Redirect from={match.url} to={`${match.url}/${firstRoutePath}`} />
						</div>
					</Row>
				</Container>
				{this.renderDialog()}
			</main>
		);
	}

}

export default Cashier;
