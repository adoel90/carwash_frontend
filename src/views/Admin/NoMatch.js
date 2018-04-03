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
            history,
            routes
        } = this.props;

        console.log(this.props)

        return history.push(routes[0].path);
    }
    
    render() { return null }
}

export default NoMatch;