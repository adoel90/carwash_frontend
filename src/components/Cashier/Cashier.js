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

	renderSubRoutes = (route, i) => {
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
