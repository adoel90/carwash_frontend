//VendorPanelView.js
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PrivateRoute, PropsRoute } from '../../../components/Route'
import { CustomerSidebar, CustomerPage } from '../CustomerLayout';
import { LayoutCustomer, HeaderCustomer } from '../../../layouts/LayoutCustomer';

import MainSubheader from '../../../components/MainSubheader';
import MainContent from '../../../components/MainContent';

import ProfileContainer from '../CustomerMyProfile/ProfileContainer'
import StoreContainer from '../CustomerOurService/StoreContainer'

import { CustomerLoginView } from '../../Customer/CustomerLogin';



const CustomerPanelView = props => {

    const {
        isAuthenticated,
        accessToken,
        memberData,
        userData,
        match,
        handleRouteRedirect
    } = props;

    // console.log(props);

    // if(userData.id) {
    //     return <p>You are not authorized to view this content.</p>
    // }

    return (
        <div>
            <br />
            <br />
            <br />

            <LayoutCustomer>
                <HeaderCustomer {...props} />
                <MainSubheader {...props} />

                {/* Di sini gw mesti taro class "header sub-header" */}
                <MainContent>

                    <PropsRoute
                        name="landing"
                        path={`${match.url}/landing`}
                        // component={LandingContainer}
                        component={CustomerLoginView}
                        {...this.props}
                    />

                    <PrivateRoute
						name="store"
						path={`${match.url}/store`}
						component={StoreContainer}
						isAuthenticated={isAuthenticated}
						memberData={memberData}
						accessToken={accessToken}
						redirectTo={`${match.url}/landing`}
					/>

                    <PrivateRoute
                        name="profile"
                        path={`${match.url}/profile`}
                        component={ProfileContainer}
                        isAuthenticated={isAuthenticated}
                        memberData={memberData}
                        accessToken={accessToken}
                        redirectTo={`${match.url}/landing`}
                    />

                    <Redirect from={`${match.url}`} to={`${match.url}/landing`} />

                    {handleRouteRedirect}

                </MainContent>
                {/* Di sini lo mainin untuk page Customer : */}

                {/* <CustomerSidebar {...props} />  */}
                {/* <CustomerPage {...props} /> */}
            </LayoutCustomer>
        </div>
    )
};

export default CustomerPanelView;