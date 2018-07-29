import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Section } from '../../../layouts/Section';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, InputAddon, Switch, Select } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Button } from '../../../components/Button';

const ElementFormInputDatePickerView = props => {

    const { showDate, period, handlePeriodChange } = props;

    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Form Input - Date Picker </h4>
                    </PanelHeader>
                    <PanelBody>
                        <Form onSubmit={showDate}>
                            <Row>
                                <Column className="flex">
                                    <div className="margin-right-small">
                                        <FormField>
                                            <InputGroup>
                                                <InputAddon>
                                                    <i className="fas fa-calendar-alt"></i>
                                                </InputAddon>
                                                <DatePicker
                                                    className="input"
                                                    dateFormat="DD MMM YYYY"
                                                    textPlaceholder="End Date"
                                                    // minDate={period.from}
                                                    selected={period.to}
                                                    onChange={(date) => handlePeriodChange('to', date)}
                                                />
                                            </InputGroup>
                                        </FormField>
                                    </div>
                                    <div>
                                        <FormField>
                                            <Button type="submit" style={{ height: '50px' }}>
                                                Cari
                                            </Button>
                                        </FormField>
                                    </div>
                                </Column>
                            </Row>
                        </Form>


                        <br /><br /><br /><br /><br /><br /><br /><br /><br />
                    </PanelBody>
                </Panel>
            </Section>
        </div>
    )
};

export default ElementFormInputDatePickerView;