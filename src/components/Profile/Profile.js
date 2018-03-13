import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Modal } from 'reactstrap';
import { ModalDialog } from '../Modal';
import { PropsRoute } from '../Route';
import { Row, Container, Column } from '../../layouts/Grid';
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
			return submodules.map((item, i) => {
				return (
					<PropsRoute
						key={i}
						name={item.name}
						path={`${match.url}/${item.path}`}
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

		let firstRoutePath = submodules[0].path;
// 
		// console.log(this.props)

		return (
			<main className="main main--has-subheader">
				<Container className="padding-top-3 padding-bottom-3">
					<Row>
						<Column md={2} sm={12}>
							<aside>
								{ renderSidenav() }
							</aside>
							
						</Column>
						<Column md={10} sm={12}>
							<div>
								{ renderRoutes() }
								<Redirect from="/*" to={`${match.url}/${firstRoutePath}`} />
							</div>
						</Column>
						
						{/* <aside className="sidebar column-2">
							{ renderSidenav() }
						</aside>
						<div className="column-10">
							{ renderRoutes() }
							<Redirect from="/*" to={`${match.url}/${firstRoutePath}`} />
						</div> */}

					
					</Row>
				</Container>
				{ renderDialog() }
			</main>
		);
	}
}

export default Profile;