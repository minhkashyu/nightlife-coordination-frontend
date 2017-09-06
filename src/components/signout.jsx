import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Confirm } from 'semantic-ui-react';

import SiteLoader from './template/siteLoader.jsx';
import { logout } from './../actions/auth';

class SignOut extends React.Component {

    state = { open: true };

    handleConfirm = () => {
        this.setState({ open: false });
        this.props.logout();
    };
    handleCancel = () => this.setState({ open: false });

    render() {
        if (!this.state.open || !this.props.isAuthenticated) {
            return (
                <Redirect to={{
                    pathname: '/',
                    state: { from: this.props.location }
                }}/>
            );
        }
        return (
            <Container className='main-wrapper'>
                <SiteLoader />
                <Confirm
                    open={this.state.open}
                    content='Are you sure you want to sign out of your account?'
                    cancelButton='Cancel'
                    confirmButton="Sign out now"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps, { logout })(SignOut);