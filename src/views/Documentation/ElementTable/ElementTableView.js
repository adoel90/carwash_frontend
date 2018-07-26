import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Row, Column } from '../../../layouts/Grid';
import { TableSet } from '../../../components/Table';

const ElementTableView = props => {

    const { cardList, table, search,  } = props;

    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Table </h4>
                    </PanelHeader>
                    <PanelBody>
                            <Row>
                                <Column md={12}>
                                    <div className="admin-Card__content">
                                          <TableSet
                                                loading={cardList.isFetching}
                                                loaded={cardList.isLoaded}
                                                columns={table.columns}
                                                rows={table.rows}
                                                striped 
                                                fullWidth
                                                pagination
                                                placeholder="Cari kartu yang terdaftar"
                                                searchBy={search.searchBy}
                                                {...props}
                                          />
                                    </div>
                                </Column>
                            </Row>
                    </PanelBody>
                </Panel>
            </Section>
        </div>
    )
};

export default ElementTableView;