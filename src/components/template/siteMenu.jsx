import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types'
import { Menu, Icon } from 'semantic-ui-react';

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

    handleLogin  = (e, { name }) => {
        this.setState({ activeItem: name });
        this.props.loginGithub();
    };

    render() {
        const { activeItem } = this.state;

        return (
            <Menu pointing secondary>
                <Menu.Menu position='right'>
                    <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
                        <Icon name='home' />
                        Home
                    </Menu.Item>
                    <Menu.Item name='signin' active={activeItem === 'signin'} onClick={this.handleLogin}>
                        <Icon.Group size='small'>
                            <Icon name='github' />
                            <Icon corner name='sign in' />
                        </Icon.Group>
                        Sign in Github
                    </Menu.Item>
                    <Menu.Item name='activities' active={activeItem === 'activities'} onClick={this.handleItemClick}>
                        <Icon name='history' />
                        Activitiy Log
                    </Menu.Item>
                    <Menu.Item name='signout' active={activeItem === 'sign out'} onClick={this.handleItemClick}>
                        <Icon.Group size='small'>
                            <Icon name='user circle' />
                            <Icon corner name='sign out' />
                        </Icon.Group>
                        Sign out
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default withCookies(withRouter(connect(mapStateToProps, { authenticatedTest, loginGithub })(SiteMenu)));