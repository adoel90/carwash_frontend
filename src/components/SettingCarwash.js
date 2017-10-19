import React from 'react';

import PageBlock from './PageBlock';
import Table from './Table';
import TableHeader from './TableHeader';
import Button from './Button';

class SettingCarwash extends React.Component {
    constructor() {
        super();
    }

    render() {
        this.state = {
            tableHeader: [
                { name: 'Daftar layanan' },
                { name: 'Harga' },
                { name: 'Keterangan' },
                { name: 'Action' }
            ]
        }

        return(
            <div id="setting-customer">
                <div className="flex justify-content--space-between align-items--center padding-bottom-1">
                    <h4 className="fw-semibold">Car Wash</h4>
                    <div className="flex align-items--center">
                        <button type="submit" className="button button--primary button--smallest margin-left-1">
                            <small className="fw-bold ls-base">Tambah Layanan</small>
                        </button>
                    </div>
                </div>

                <PageBlock>
                    <Table>
                        <TableHeader {...this.state} />
                        <tbody>
                            <tr>
                                <td>Paket Smart Wash</td>
                                <td className="center">45.000</td>
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
                            <tr>
                                <td>Paket Smart Wash</td>
                                <td className="center">45.000</td>
                                <td>Labore senserit iis efflorescere.</td>
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

export default SettingCarwash;
