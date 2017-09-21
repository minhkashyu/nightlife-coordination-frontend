import React from 'react';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { Container, Header, Divider, Icon, Grid, Message, Transition } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { resetResults, selectResult, loadGooglePlacesAutocomplete, fetchBars, addBar, removeBar } from './../actions/search';
import { loginGithub } from './../actions/auth';
import SearchInput from './template/searchInput.jsx';
import SearchButton from './template/searchButton.jsx';
import BarCardGroup from './template/barCardGroup.jsx';

class Home extends React.Component {

    static propTypes = {
        cookies: PropTypes.instanceOf(Cookies).isRequired
    };

    componentWillMount() {
        const { isAuthenticated, cookies, selectResult, fetchBars, bars } = this.props;
        if (isAuthenticated) {
            const lastLocation = cookies.get('lastLocation');
            if (bars.length < 1 && lastLocation) {
                selectResult(lastLocation);
                fetchBars(lastLocation, isAuthenticated);
            }
        }
    }

    renderError = () => {
        const { errorMessage } = this.props;
        if (errorMessage) {
            return <Message error header='Error!' content={errorMessage} />;
        }
    };

    render() {
        const { bars } = this.props;
        return (
            <Container className='main-wrapper'>
                <Header as='h1' textAlign='center' color='teal'>Nightlife Coordination App</Header>
                <Header as='h4' textAlign='center' inverted color='grey'>A Freecodecamp Full-Stack Project using React/Redux, Semantic UI with Google Material theme, Express.js, Passport.js and MongoDB</Header>
                <Divider section horizontal inverted>
                    <Icon.Group size='huge'>
                        <Icon loading inverted color='grey' size='big' name='circle notched' />
                        <Icon name='marker' color='red' />
                    </Icon.Group>
                    <Icon.Group size='huge'>
                        <Icon loading inverted color='grey' size='big' name='circle notched' />
                        <Icon name='taxi' color='yellow' />
                    </Icon.Group>
                    <Icon.Group size='huge'>
                        <Icon loading inverted color='grey' size='big' name='circle notched' />
                        <Icon name='bar' color='blue' />
                    </Icon.Group>
                </Divider>
                <Header as='h4' textAlign='center' color='teal'>Find a bar - Take a cab - Drink responsibly</Header>
                <Grid>
                    <Grid.Column width={12}>
                        <SearchInput {...this.props} />
                        {this.renderError()}
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <SearchButton {...this.props} />
                    </Grid.Column>
                </Grid>
                { bars.length > 0 &&
                    <Transition animation='fade' duration={500}>
                        <Container style={{ marginTop: '2em' }}>
                            <Header as='h5' icon textAlign='center' color='teal'>
                                <Icon name='bar' circular inverted color='teal' />
                                <Header.Content>Bars</Header.Content>
                            </Header>
                            <BarCardGroup {...this.props} />
                        </Container>
                    </Transition>
                }
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.search.error,
        query: state.search.query,
        results: state.search.results,
        bars: state.search.googleBars,
        goingBars: state.search.goingBars,
        goingTotals: state.search.goingTotals,
        isFetching: state.common.isFetching,
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default withCookies(connect(mapStateToProps, { resetResults, selectResult, loadGooglePlacesAutocomplete, fetchBars, addBar, removeBar, loginGithub })(Home));