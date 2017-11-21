import React, { Component } from 'react';
import { Container, Row } from '../Grid';
import { AdminSidebar } from '../Admin';


class Report extends Component {
    render() {
        return (
            <main className="main main--has-subheader">
                <Container>
                    <div className="column-4">
                        <AdminSidebar {...this.props} />
                    </div>
                    <div className="column-8"></div>
                </Container>
            </main>
        );
    }
}

export default Report;