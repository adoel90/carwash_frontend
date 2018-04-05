import React from 'react';

class NoMatch extends React.Component {
    constructor() {
        super();

        this.handleRedirect = this.handleRedirect.bind(this);
    }

    componentWillMount = () => {
        this.handleRedirect();
    }

    handleRedirect = () => {
        const {
            user,
            history,
            path,
            routes
        } = this.props;

        if(user.module[0].group !== 'admin' && path === undefined) {
            return history.push(routes[0].path);
        }
    }
    
    render() { return null }
}

export default NoMatch;