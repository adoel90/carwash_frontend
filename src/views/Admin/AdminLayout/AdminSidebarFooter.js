import React from 'react';
import { MenuLink } from '../../../components/Menu';
import { Button } from '../../../components/Button';

const AdminSidebarFooter = props => {
    return (
        <div className="sidebar--footer">
            <div className="flex justify-content--space-between align-items--center">
                <p style={{color: '#FAFAFA', fontWeight: '900', overflow:'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', paddingRight: '5px'}}>
                    { props.user.name }
                </p>
                <div>
                    <MenuLink to={`/admin/setting`}>
                        <Button theme="dark" rounded size="small">
                            <i className="fas fa-cog"></i>
                        </Button>
                    </MenuLink>
                    <MenuLink to={`/admin/logout`}>
                        <Button theme="dark" rounded size="small">
                            <i className="fas fa-power-off"></i>
                        </Button>
                    </MenuLink>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebarFooter;