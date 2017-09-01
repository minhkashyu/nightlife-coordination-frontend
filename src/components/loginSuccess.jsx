import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SiteLoader from './template/siteLoader.jsx';
import { loginSuccess } from './../actions/auth';

class LoginSuccess extends React.Component {

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
            <div>
                <p className="text-center">You are being redirected...</p>
                {this.renderError()}
                {this.renderLoader()}
            </div>
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

export default connect(mapStateToProps, { loginSuccess })(LoginSuccess);