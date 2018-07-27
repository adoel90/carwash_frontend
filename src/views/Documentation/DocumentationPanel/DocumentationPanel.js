import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
        DocsCssFramework, 
        ElementButton,
        ElementTable,
        ElementSelectDropdownlist,
        ElementFormInput,
        ElementFormInputDatePicker,
        ElementModal
    } from '../../Documentation';

// import NoMatch from '../NoMatch';
import { DocumentationPanelView } from '../DocumentationPanel';
 
class DocumentationPanel extends Component {    
    
    constructor(props) {
        
        super(props);
        this.state = {
            routes: [
                { name: 'css-framework', path: `${props.match.url}/`, component: DocsCssFramework },
                { name: 'css-framework', path: `${props.match.url}/css-framework`, component: DocsCssFramework },
                { name: 'button', path: `${props.match.url}/button`, component: ElementButton },
                { name: 'table', path: `${props.match.url}/table`, component: ElementTable },
                { name: 'select-dropdownlist', path: `${props.match.url}/selectdropdownlist`, component: ElementSelectDropdownlist },
                { name: 'form-input', path: `${props.match.url}/form-input`, component: ElementFormInput },
                { name: 'form-input-datepicker', path: `${props.match.url}/form-input-datepicker`, component: ElementFormInputDatePicker },
                { name: 'modal', path: `${props.match.url}/modal`, component: ElementModal },
            ],
            menus: [
                {
                    category: 'Component',
                    items: [
                        // { name: 'Framework', path: `${props.match.url}/framework-css` },
                        { name: 'Button', path: `${props.match.url}/button` },
                        { name: 'Table', path: `${props.match.url}/table` },
                        { name: 'Select', path: `${props.match.url}/selectdropdownlist` },
                        { name: 'Form Input', path: `${props.match.url}/form-input` },
                        { name: 'Input Date Picker', path: `${props.match.url}/form-input-datepicker` },
                        { name: 'Modal', path: `${props.match.url}/modal` },
                        { name: 'PageBlock', path: `${props.match.url}/page` },
                        { name: 'Card', path: `${props.match.url}/card` },
                        { name: 'Panel/Paper', path: `${props.match.url}/panel` },
                        { name: 'Checkbox', path: `${props.match.url}/checkbox` },
                        { name: 'Dialog', path: `${props.match.url}/dialoog` },
                        { name: 'List', path: `${props.match.url}/list` },
                        { name: 'Navigation', path: `${props.match.url}/navigation` },
                        { name: 'Pagination', path: `${props.match.url}/pagination` },
                        { name: 'Search Bar', path: `${props.match.url}/searchbar` },
                        { name: 'Tab', path: `${props.match.url}/tab` },
                        { name: 'Section', path: `${props.match.url}/section` },
                        

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
