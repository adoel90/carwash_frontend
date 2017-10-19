import React from 'react';

import SettingLunch from '../components/SettingLunch';

class SettingLunchContainer extends React.Component {
    render() {
        return <SettingLunch {...this.props} {...this.state} />;
    }
}

export default SettingLunchContainer;
