import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row } from '../../../layouts/Grid';
import { PrivateRoute, PropsRoute } from '../../../utilities/Route';
import { ModalDialog } from '../../../components/Modal';

import { MainSidenav, CustomerStoreContent } from '../CustomerStore';

class CustomerStoreView extends React.Component {
    constructor() {
        super();
        this.handleSidenav = this.handleSidenav.bind(this);
        this.renderStoreContent = this.renderStoreContent.bind(this);
        this.renderDialog = this.renderDialog.bind(this);
    }

    renderStoreContent = () => {
		const {
            store,
            storeList,
			match,
            user,
            member
		} = this.props;

		if(store.list.isFetching) {
			return <p>Tunggu sebentar...</p>
		}

		if(store.list.isLoaded) {
			return storeList.active.map((item, i) => {
                let path = item.name.replace(/\s+/g, '-').toLowerCase();

				return (
					<PropsRoute
						key={i}
						name={item.name}
						path={`${match.url}/${path}`}
						component={CustomerStoreContent}
                        item={item.name}
                        storeList={storeList}
                        member={member}
						// {...this.props}
					/>
				)
			})
		}

		return null;

	}

    handleSidenav = () => {
        const {
            store,
            storeList,
            match
        } = this.props;

        if(store.list.isLoaded) {
            return <MainSidenav items={storeList.active} basePath={match.path} />
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
    
    render() {
        const {
            match,
            store,
            storeList
        } = this.props;

        let firstRoutePath;

        if(storeList.active.length) {
            firstRoutePath = storeList.active[0].name.replace(/\s+/g, '-').toLowerCase();
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
							{ this.renderStoreContent() }
							<Redirect from="/*" to={`${match.url}/${firstRoutePath}`} />
						</div>
					</Row>
				</Container>
				{this.renderDialog()}
			</main>
        );
    }
}

export default CustomerStoreView;