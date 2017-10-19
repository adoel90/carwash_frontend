import React from 'react';

import SettingDinner from '../components/SettingDinner';

class SettingDinnerContainer extends React.Component {
    render() {
        return <SettingDinner {...this.props} {...this.state} />;
    }
}

export default SettingDinnerContainer;
