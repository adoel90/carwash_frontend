import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute, PropsRoute } from '../../../components/Route';
import { LayoutCustomer, HeaderCustomer } from '../../../layouts/LayoutCustomer';

import MainSubheader from '../../../components/MainSubheader';
import MainContent from '../../../components/MainContent';

// import ProfileContainer from '../CustomerMyProfile/ProfileContainer'
// import StoreContainer from '../CustomerOurService/StoreContainer';

import { CustomerStore } from '../CustomerStore';
import { CustomerLogin } from '../CustomerLogin';

const CustomerPanelView = props => {
    const {
        isAuthenticated,
        accessToken,
        memberData,
        match,
        handleRouteRedirect
    } = props;

    return (
        <LayoutCustomer>
            <HeaderCustomer {...props} />
            {/* <MainSubheader {...props} /> */}

            <MainContent>
                <PropsRoute
                    name="landing"
                    path={`${match.url}/landing`}
                    // component={LandingContainer}
                    component={CustomerLogin}
                    {...this.props}
                />

                <PrivateRoute
                    name="store"
                    path={`${match.url}/store`}
                    component={CustomerStore}
                    isAuthenticated={isAuthenticated}
                    memberData={memberData}
                    accessToken={accessToken}
                    redirectTo={`${match.url}/landing`}
                />

                {/* <PrivateRoute
                    name="profile"
                    path={`${match.url}/profile`}
                    component={ProfileContainer}
                    isAuthenticated={isAuthenticated}
                    memberData={memberData}
                    accessToken={accessToken}
                    redirectTo={`${match.url}/store`}
                /> */}

                <Redirect from={`${match.url}`} to={`${match.url}/store`} />

                {handleRouteRedirect}
            </MainContent>
        </LayoutCustomer>
    )
};

export default CustomerPanelView;