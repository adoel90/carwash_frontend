import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { PropsRoute } from '../../utilities/Route';
import { ServiceHome, ServiceLogin } from '../Service';

const ServiceView = props => {
    const {
        match
    } = props;

    console.log(match);
    
    return (
        <Switch>
            <PropsRoute
                name="Service"
                path={`${match.url}/home`}
                component={ServiceHome}
            />
            <PropsRoute
                name="Login"
                path={`${match.url}/login`}
                component={ServiceLogin}
            />
        </Switch>
    );
};

ServiceView.propTypes = {
    
};

export default ServiceView;