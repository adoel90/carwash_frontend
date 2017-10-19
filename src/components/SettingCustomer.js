import React from 'react';

import PageBlock from './PageBlock';
import Table from './Table';
import TableHeader from './TableHeader';
import Button from './Button';

class SettingCustomer extends React.Component {
    constructor() {
        super();
    }

    render() {
        this.state = {
            tableHeader: [
                { name: 'Customer' },
                { name: 'Tanggal' },
                { name: 'E-mail' },
                { name: 'Alamat' },
                { name: 'Action' }
            ]
        }

        return(
            <div id="setting-customer">
                <div className="padding-bottom-1">
                    <h4 className="fw-semibold">Daftar Customer</h4>
                </div>

                <PageBlock>
                    <Table>
                        <TableHeader {...this.state} />
                        <tbody>
                            <tr>
                                <td>John Doe</td>
                                <td className="center">dd-mm-yyy</td>
                                <td>john@gmail.com</td>
                                <td>sasasa</td>
                                <td className="center">
                                    <Button type="submit" style="orange" size="smallest">
                                        <small className="fw-bold ls-base">Edit</small>
                                    </Button>
                                    <button type="submit" className="button button-outline--danger button--smallest margin-left-1">
                                        <small className="fw-bold ls-base">Delete</small>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </PageBlock>
            </div>
        )
    }
}

export default SettingCustomer;
