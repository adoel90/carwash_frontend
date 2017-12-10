import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { ModalDialog } from '../Modal';
import { PropsRoute } from '../Route';
import { Row, Container } from '../Grid';

import MainSidenav from '../MainSidenav';

class Profile extends Component {
	render() {
		const {
			match,
			dialog,
			submodules,
			toggleDialog
		} = this.props;

		const renderSidenav = () => {
			return <MainSidenav items={submodules} basePath={match.path} />	
		}

		const renderRoutes = () => {
			submodules.map((item, i) => {
				return (
					<PropsRoute
						key={i}
						name={item.name}
						path={item.path}
						component={item.component}
						{...this.props}
					/>
				)
			})
		}

		const renderDialog = () => {
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

		return (
			<main className="main main--has-subheader">
				<Container className="padding-top-3">
					<Row>
						<aside className="sidebar column-2">
							{ renderSidenav() }
						</aside>
						<div className="column-10">
							{ renderRoutes() }
						</div>
					</Row>
				</Container>
				{ renderDialog() }
			</main>
		);
	}
}

export default Profile;