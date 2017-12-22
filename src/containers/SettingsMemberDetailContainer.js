import React, { Component } from 'react'
import moment from 'moment';
import { SettingsMemberDetail } from '../components/Settings';

class SettingsMemberDetailContainer extends Component {
    constructor() {
        super();
        this.state = {
            activeTab: 0
        }

        this.toggleTab = this.toggleTab.bind(this);
    }

    toggleTab = (index) => {
        this.setState({
            ...this.state,
            activeTab: index
        })
    }
    
    render () {
        return (
            <SettingsMemberDetail
                {...this.props}
                {...this.state}
                toggleTab={this.toggleTab}
            />
        )
    }
}

export default SettingsMemberDetailContainer