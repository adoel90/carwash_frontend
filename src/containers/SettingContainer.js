import React from 'react';

import Setting from '../components/Setting';

class SettingContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            sidenavItems: [
				{ title: 'Submenu', path: '/setting/submenu' },
				{ title: 'Carwash', path: '/setting/carwash' },
                { title: 'Cafe Siang', path: '/setting/lunch' },
                { title: 'Cafe Malam', path: '/setting/dinner' },
				{ title: 'Customer', path: '/setting/customer' }
			]
        }
    }

    render() {
        return <Setting {...this.props} {...this.state} />;
    }
}

export default SettingContainer;
