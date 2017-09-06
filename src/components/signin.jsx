import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import SiteLoader from './template/siteLoader.jsx';
import { loginGithub } from './../actions/auth';

class SignIn extends React.Component {

    componentDidMount() {
        this.props.loginGithub();
    }

    render() {
        return (
            <Container className='main-wrapper'>
                <p className="msg-text">You are being connected to Github...</p>
                <SiteLoader />
            </Container>
        );
    }
}

export default connect(null, { loginGithub })(SignIn);