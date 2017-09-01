import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Divider, Icon, Grid, Message, Transition } from 'semantic-ui-react';

import SiteMenu from './template/siteMenu.jsx';
import SearchInput from './template/searchInput.jsx';
import SearchButton from './template/searchButton.jsx';
import BarCardGroup from './template/barCardGroup.jsx';

class Home extends React.Component {

    renderError = () => {
        const { errorMessage } = this.props;
        if (errorMessage) {
            console.dir(errorMessage);
            return <Message error header='Error!' content={errorMessage} />;
        }
    };

    render() {
        const { bars } = this.props;
        return (
            <Container style={{ marginTop: '3em', marginBottom: '3em' }}>
                <SiteMenu />
                <Header as='h1' textAlign='center' color='teal'>Nightlife Coordination App</Header>
                <Header as='h4' textAlign='center' inverted color='grey'>A Freecodecamp Full-Statck Project using React/Redux, Semantic UI with Google Material theme, Express, Passport and MongoDB</Header>
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
                        <SearchInput />
                        {this.renderError()}
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <SearchButton />
                    </Grid.Column>
                </Grid>
                { bars.length > 0 &&
                    <Transition animation='fade' duration={500}>
                        <Container style={{ marginTop: '2em' }}>
                            <Header as='h5' icon textAlign='center' color='teal'>
                                <Icon name='bar' circular inverted color='teal' />
                                <Header.Content>Bars</Header.Content>
                            </Header>
                            <BarCardGroup bars={bars} />
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
        bars: state.search.bars
    };
};

export default connect(mapStateToProps)(Home);