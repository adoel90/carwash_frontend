import React, { Component } from 'react';
import { Report } from '../components/Report';

class ReportContainer extends Component {
    constructor() {
        super();
        this.state = {
            navigations: [
                { id: 1, name: '', path: '', component: ''}
            ]
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