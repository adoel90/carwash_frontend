import React from 'react';

export default class Login extends React.Component {
    render() {
        return(
            <section className="login-container">
                <div className="content-login">
                    <div className="sideleft-login">
                        <h3>
                            <i class="material-icons">local_car_wash</i>
                            <span> 805 carwarsh</span>
                        </h3>

                        <form className="vertical-form">
                            <div className="form-group">
                                <input type="text" className="form-contol" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-contol" placeholder="Password" />
                            </div>

                            <button type="submit" className="button button--darkslategray">Sign in</button>
                        </form>
                    </div>
                    <div className="sideright-login">
                        <img src="https://static.wixstatic.com/media/b5a293_e16afca15fe343e79db0241a9c137285~mv2.png" />
                    </div>
                </div>
            </section>
        )
    }
}
