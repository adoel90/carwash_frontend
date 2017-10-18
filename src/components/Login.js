import React from 'react';

import Form from './Form';
import FormButton from './FormButton';
import FormGroup from './FormGroup';
import FormText from './FormText';

export default class Login extends React.Component {
    render() {
        return(
            <section className="login-container">
                <div className="content-login">
                    <div className="sideleft-login">
                        {/* <i className="material-icons">local_car_wash</i> */}
                        <h4>
                            805 carwarsh
                        </h4>

                        <Form>
                            <div className="flex flex-column align-items--center column-auto">
                                <FormText type="username" placeholder="Username" />
                                <FormText type="password" placeholder="Password" />
                                <FormButton style="darkslategray" type="submit" size="large">
    								<small className="fw-bold tt-uppercase ls-base">Sign in</small>
    							</FormButton>
                            </div>
                        </Form>
                    </div>
                    <div className="sideright-login">
                        <img src="https://static.wixstatic.com/media/b5a293_e16afca15fe343e79db0241a9c137285~mv2.png" />
                    </div>
                </div>
            </section>
        )
    }
}
