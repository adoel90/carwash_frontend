import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Column } from '../../../layouts/Grid';
import { Layout } from '../../../layouts/Layout';
import { PrivateRoute, PropsRoute } from '../../../utilities/Route';
import { ModalDialog } from '../../../components/Modal';
import { PageBlock } from '../../../components/Page';
import Currency from '../../../components/Currency';
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
			member,
			memberData
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
                        type={item}
                        storeList={storeList}
						member={member}
						memberData={memberData}
						toggleDialog={this.props.toggleDialog}
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
			storeList,
			memberData
        } = this.props;

        let firstRoutePath;

        if(storeList.active.length) {
            firstRoutePath = storeList.active[0].name.replace(/\s+/g, '-').toLowerCase();
		}

        return (
			<div>
				<Layout className="main main--has-subheader">
					<aside className="sidebar sidebar--customer">
						{ this.handleSidenav() }
					</aside>
					<Row className="padding-left-base padding-right-base" style={{marginLeft: '220px'}}>
						<Column md={12}>
							{ this.renderStoreContent() }
							<Redirect from="/*" to={`${match.url}/${firstRoutePath}`} />
						</Column>
					</Row>
					
					{this.renderDialog()}
				</Layout>
			</div>
        );
    }
}

export default CustomerStoreView;