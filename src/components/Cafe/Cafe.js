import React from 'react';

import { Redirect } from 'react-router-dom';
import { Container, Row } from '../Grid';
import { PropsRoute } from '../Route';

import { ModalDialog } from '../Modal';

import MainSidenav from '../MainSidenav';

import CafeTypeContainer from '../../containers/CafeTypeContainer';

class Cafe extends React.Component {
	constructor() {
		super();
		this.handleSidenav = this.handleSidenav.bind(this);
		this.renderCafeTypeContent = this.renderCafeTypeContent.bind(this)
		this.renderDialog = this.renderDialog.bind(this);
	}

	renderCafeTypeContent = () => {
		const {
			cafe,
			cafeTypes,
			match
		} = this.props;

		if(cafe.types.isLoaded) {
			return cafeTypes.active.map((type, i) => {
				let path = type.name.replace(/\s+/g, '-').toLowerCase();

				return (
					<PropsRoute
						key={i}
						name={type.name}
						path={`${match.url}/${path}`}
						component={CafeTypeContainer}
						type={type}
						{...this.props}
					/>
				)
			})
		}

		return null;

	}

	handleSidenav = () => {
		const {
			cafe,
			cafeTypes,
			match
		} = this.props;

		if(cafe.types.isLoaded) {
			return <MainSidenav items={cafeTypes.active} basePath={match.path} />
		}
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


	render() {
		const {
			match,
			cafe,
			cafeTypes
		} = this.props;

		let firstRoutePath;

		if(cafeTypes.active.length) {
			firstRoutePath = cafeTypes.active[0].name.replace(/\s+/g, '-').toLowerCase();
		}

		return (
			<main className="main main--has-subheader">
				<Container className="padding-top-3 padding-bottom-3">
					<Row>
						<div className="column-2">
							<aside className="sidebar">
								{ this.handleSidenav() }
							</aside>
						</div>
						<div className="column-10">
							{ this.renderCafeTypeContent() }
							<Redirect from="/*" to={`${match.url}/${firstRoutePath}`} />

							{/* { cafe.types.isLoaded ? cafeTypes.map(this.renderCafeTypeContent) : null } */}
						</div>
					</Row>
				</Container>
				{this.renderDialog()}
			</main>
		)
	}
}


export default Cafe;
