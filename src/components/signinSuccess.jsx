import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import SiteLoader from './template/siteLoader.jsx';
import { loginSuccess } from './../actions/auth';

class SigninSuccess extends React.Component {

    componentDidMount() {
        const { match, loginSuccess } = this.props;
        loginSuccess(match.params.media, match.params.jwt);
    }

    renderError = () => {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Error</strong>&nbsp;&nbsp;{this.props.errorMessage}
                </div>
            );
        }
    };

    renderLoader = () => {
        if (this.props.isFetching) {
            return <SiteLoader />;
        }
    };

    render() {
        const { isAuthenticated, location } = this.props;
        if (isAuthenticated) {
            return (
                <Redirect to={{
                    pathname: '/',
                    state: { from: location }
                }}/>
            );
        }
        return (
            <Container className='main-wrapper'>
                <p className="text-center">You are being redirected...</p>
                {this.renderError()}
                {this.renderLoader()}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated,
        isFetching: state.common.isFetching
    };
};

export default connect(mapStateToProps, { loginSuccess })(SigninSuccess);