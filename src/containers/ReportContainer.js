import React, { Component } from 'react';
import { Report } from '../components/Report';

class ReportContainer extends Component {
    constructor() {
        super();
        this.handleNavigationItems = this.handleNavigationItems.bind(this);
        this.state = {
            navigations: []
        }
    }
    
    render() {
        return (
            <Report
                {...this.state}
                {...this.props}
            />
        );
    }
}

export default ReportContainer;