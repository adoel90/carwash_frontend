import React from 'react';

import SettingCarwash from '../components/SettingCarwash';

class SettingCarwashContainer extends React.Component {
    render() {
        return <SettingCarwash {...this.props} {...this.state} />;
    }
}

export default SettingCarwashContainer;
