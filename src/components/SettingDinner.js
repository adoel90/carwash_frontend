import React from 'react';

import PageBlock from './PageBlock';
import Table from './Table';
import TableHeader from './TableHeader';
import Button from './Button';

class SettingDinner extends React.Component {
    constructor() {
        super();
    }

    render() {
        this.state = {
            tableHeader: [
                { name: 'Daftar Menu' },
                { name: 'Harga' },
                { name: 'Keterangan' },
                { name: 'Action' }
            ]
        }

        return(
            <div id="setting-customer">
                <div className="flex justify-content--space-between padding-bottom-1">
                    <h4 className="fw-semibold">Cafe Malam</h4>
                    <div className="flex align-items--center">
                        <button type="submit" className="button button--primary button--smallest margin-left-1">
                            <small className="fw-bold ls-base">Tambah Menu</small>
                        </button>
                    </div>
                </div>

                <PageBlock>
                    <Table>
                        <TableHeader {...this.state} />
                        <tbody>
                            <tr>
                                <td>Mie Goreng</td>
                                <td className="center">15.000</td>
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

export default SettingDinner;
