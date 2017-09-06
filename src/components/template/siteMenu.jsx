import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types'
import { Container, Menu, Icon } from 'semantic-ui-react';

import { authenticatedTest } from './../../actions/auth';

class SiteMenu extends React.Component {

    constructor(props) {
        super(props);
        this.props.authenticatedTest();
    }

    static propTypes = {
        cookies: PropTypes.instanceOf(Cookies).isRequired
    };

    render() {
        const { isAuthenticated } = this.props;
        return (
            <Container className="site-menu">
                <Menu pointing secondary stackable>
                    <Menu.Menu position='right'>
                        <Menu.Item as={NavLink} exact to='/'>
                            <Icon name='home' size='large' />
                            Home
                        </Menu.Item>
                        {!isAuthenticated &&
                            <Menu.Item as={NavLink} exact to='/login'>
                                <Icon name='github' size='large' />
                                Sign in Github
                            </Menu.Item>
                        }
                        {isAuthenticated &&
                            <Menu.Item as={NavLink} exact to='/activity-log'>
                                <Icon name='history' size='large' />
                                Activity Log
                            </Menu.Item>
                        }
                        {isAuthenticated &&
                            <Menu.Item as={NavLink} exact to='/logout'>
                                <Icon.Group size='large'>
                                    <Icon name='sign out' />
                                </Icon.Group>
                                Sign out
                            </Menu.Item>
                        }
                    </Menu.Menu>
                </Menu>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default withCookies(withRouter(connect(mapStateToProps, { authenticatedTest })(SiteMenu)));