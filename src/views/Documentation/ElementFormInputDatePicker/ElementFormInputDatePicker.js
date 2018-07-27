import React, { Component } from 'react';
import moment from 'moment';

import { ElementFormInputDatePickerView } from '../ElementFormInputDatePicker';

class ElementFormInputDatePicker extends Component {
            
    constructor(){
        super();
        this.showDate = this.showDate.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);

        this.state = {
            period: {
                from: moment(),
        		to: moment()
            },   
        };
    };

    showDate = (e) => {
        e.preventDefault();

        const { period } = this.state;
        
        let requiredData = {
            start_date : moment(period.to).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'),
    
        };
        console.log(requiredData);
    };

    handlePeriodChange = (fromTo, date) => {
        const { period } = this.state;
    	period[fromTo] = date;
    	this.forceUpdate();
    };
    
    render() {

        return (
            <div>
                <ElementFormInputDatePickerView 
                    handlePeriodChange = {this.handlePeriodChange}
                    showDate = {this.showDate}
                    {...this.state} 
                    {...this.props} />
            </div>
        )
    }
};

export default ElementFormInputDatePicker;