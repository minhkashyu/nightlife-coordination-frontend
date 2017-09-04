import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SiteLoader from './template/siteLoader.jsx';
import { logout } from './../actions/auth';

class Signout extends React.Component {

    componentDidMount() {
        this.props.logout();
    }

    render() {
        if (!this.props.isAuthenticated) {
            return (
                <Redirect to={{
                    pathname: '/',
                    state: { from: this.props.location }
                }}/>
            );
        }
        return (
            <div>
                <p className="text-center">You are being redirected...</p>
                <SiteLoader />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps, { logout })(Signout);