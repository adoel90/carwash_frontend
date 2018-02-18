import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { PropsRoute } from '../../../utilities/Route';

const AdminPanelView = props => {
    const {
        routes,
    } = props;

    return (
        <div className="layout">
            <aside className="sidebar">
                <div className="menu menu--dark">
                    <h6 className="menu__category">Category</h6>
                    <ul className="menu__list">
                        <li className="menu__item menu__item--active">
                            <a href="#">Dasbor</a>
                        </li>
                        <li className="menu__item">
                            <a href="#">Manajemen User</a>
                        </li>
                        <li className="menu__item">
                            <a href="#">Manajemen Member</a>
                        </li>
                        <li className="menu__item">
                            <a href="#">Laporan</a>
                        </li>
                    </ul>
                </div>
            </aside>
            <main className="page">
                <header className="header"></header>
                <main className="content">
                    <section>
                        <h4>Dasbor</h4>
                        <p>Deserunt adipisicing nulla pariatur do ullamco eiusmod qui Lorem mollit labore ea.</p>
                    </section>
                </main>
            </main>
        </div>
    )
};

export default AdminPanelView;