import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types'
import { Container, Menu, Icon } from 'semantic-ui-react';

import { authenticatedTest, loginGithub } from './../../actions/auth';

class SiteMenu extends React.Component {

    constructor(props) {
        super(props);
        this.props.authenticatedTest();
        this.state = { activeItem: 'home' };
    }

    static propTypes = {
        cookies: PropTypes.instanceOf(Cookies).isRequired
    };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    goHome = () => this.setState({ activeItem: 'home' });

    handleLogin  = (e, { name }) => {
        this.setState({ activeItem: name });
        this.props.loginGithub();
    };

    render() {
        const { activeItem } = this.state;
        const { isAuthenticated } = this.props;
        return (
            <Container className="site-menu">
                <Menu pointing secondary stackable>
                    <Menu.Menu position='right'>
                        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
                            <Icon name='home' size='large' />
                            Home
                        </Menu.Item>
                        {!isAuthenticated &&
                            <Menu.Item name='signin' active={activeItem === 'signin'} onClick={this.handleLogin}>
                                <Icon name='github' size='large' />
                                Sign in Github
                            </Menu.Item>
                        }
                        {isAuthenticated &&
                            <Menu.Item name='activities' active={activeItem === 'activities'} onClick={this.handleItemClick}>
                                <Icon name='history' size='large' />
                                Activitiy Log
                            </Menu.Item>
                        }
                        {isAuthenticated &&
                            <Menu.Item as={Link} to='/logout' name='signout' active={activeItem === 'signout'} onClick={this.goHome}>
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

export default withCookies(withRouter(connect(mapStateToProps, { authenticatedTest, loginGithub })(SiteMenu)));