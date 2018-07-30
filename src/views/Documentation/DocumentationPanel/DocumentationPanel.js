import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
        DocsCssFramework, 
        ElementButton,
        ElementTable,
        ElementSelectDropdownlist,
        ElementFormInput,
        ElementFormInputDatePicker,
        ElementModal,
        ElementCardCustomer,
        ElementTableReactBootstrap
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
                { name: 'table-search-react-bootstrap', path: `${props.match.url}/table-search-react-bootstrap`, component: ElementTableReactBootstrap },
                
                { name: 'select-dropdownlist', path: `${props.match.url}/selectdropdownlist`, component: ElementSelectDropdownlist },
                { name: 'form-input', path: `${props.match.url}/form-input`, component: ElementFormInput },
                { name: 'form-input-datepicker', path: `${props.match.url}/form-input-datepicker`, component: ElementFormInputDatePicker },
                { name: 'modal', path: `${props.match.url}/modal`, component: ElementModal },
                { name: 'card', path: `${props.match.url}/card`, component: ElementCardCustomer },

                
            ],
            menus: [
                {
                    category: 'Component',
                    items: [
                        // { name: 'Framework', path: `${props.match.url}/framework-css` },
                        { name: 'Button', path: `${props.match.url}/button` },
                        { name: 'Table', path: `${props.match.url}/table` },
                        { name: 'Table React Bootstrap', path: `${props.match.url}/table-react-bootstrap` },
                        { name: 'Table + Search React Bootstrap', path: `${props.match.url}/table-search-react-bootstrap` },
                        { name: 'Select', path: `${props.match.url}/selectdropdownlist` },
                        { name: 'Form Input', path: `${props.match.url}/form-input` },
                        { name: 'Input Date Picker', path: `${props.match.url}/form-input-datepicker` },
                        { name: 'Modal', path: `${props.match.url}/modal` },
                        { name: 'Card', path: `${props.match.url}/card` },
                        { name: 'Tab', path: `${props.match.url}/tab` },
                        { name: 'Navigation', path: `${props.match.url}/navigation` },
                        { name: 'PageBlock', path: `${props.match.url}/page` },
                        { name: 'Panel/Paper', path: `${props.match.url}/panel` },
                        { name: 'Checkbox', path: `${props.match.url}/checkbox` },
                        { name: 'Dialog', path: `${props.match.url}/dialoog` },
                        { name: 'List', path: `${props.match.url}/list` },
                        

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
