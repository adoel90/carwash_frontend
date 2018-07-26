import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DocsCssFramework } from '../../Documentation';
// import NoMatch from '../NoMatch';
import { DocumentationPanelView } from '../DocumentationPanel';

class DocumentationPanel extends Component {    
    
    constructor(props) {
        
        super(props);
        this.state = {
            routes: [
                // { name: 'css-framework', path: `${props.match.url}`, component: DocsCssFramework },
                // { name: 'css-framework', path: `${props.match.url}/framework-css`, component: DocsCssFramework },
            ],
            menus: [
                {
                    category: 'Component',
                    items: [
                        // { name: 'Framework', path: `${props.match.url}/framework-css` },
                        { name: 'Button', path: `${props.match.url}/button` },
                        { name: 'Table', path: `${props.match.url}/table` },
                        { name: 'Panel/Paper', path: `${props.match.url}/panel` },
                        { name: 'Card', path: `${props.match.url}/card` },
                        { name: 'Checkbox', path: `${props.match.url}/checkbox` },
                        { name: 'Dialog', path: `${props.match.url}/dialoog` },
                        { name: 'Editor', path: `${props.match.url}/editor` },
                        { name: 'Form', path: `${props.match.url}/form` },
                        { name: 'Form', path: `${props.match.url}/form` },
                        { name: 'Icon', path: `${props.match.url}/icon` },
                        { name: 'Input', path: `${props.match.url}/input` },
                        { name: 'List', path: `${props.match.url}/list` },
                        { name: 'Modal', path: `${props.match.url}/modal` },
                        { name: 'Navigation', path: `${props.match.url}/navigation` },
                        { name: 'PageBlock', path: `${props.match.url}/page` },
                        { name: 'Pagination', path: `${props.match.url}/pagination` },
                        { name: 'Search Bar', path: `${props.match.url}/searchbar` },
                        { name: 'Tab', path: `${props.match.url}/tab` },
                        { name: 'Grid', path: `${props.match.url}/grid` },
                        { name: 'Section', path: `${props.match.url}/section` },
                        { name: 'Layout', path: `${props.match.url}/layout` },




                        
                        // { name: 'Pengaturan User', path: `${props.match.url}/user/settings` },
                    ]    
                }
            ]
        }
    };

    // let routePage = [
    //     { name: 'user', path: `${this.props.match.url}`, component: AdminLawyerCreateDocumentSimple },
    //     { name: 'user', path: `${this.props.match.url}/user`, component: AdminLawyerCreateDocumentSimple },
    //     { name: 'create-user', path: `${this.props.match.url}/user/create-new-user`, component: AdminLawyerCreateDocument },
    //     { name: 'logout', path: `${this.props.match.url}/logout`, component: AdminLogout },
    //     { component: NoMatch }
    // ];

    render() {

        return (
            <DocumentationPanelView
                {...this.state} 
                {...this.props} 
            />
        )
    }
}

export default DocumentationPanel;
