import React from 'react';
//import { connect } from 'react-redux';
import { Container, Header, Divider, Icon, Segment } from 'semantic-ui-react';
import SearchForm from './template/searchForm.jsx';

class Home extends React.Component {
    render() {
        return (
            <Container style={{ marginTop: '3em' }}>
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
                <SearchForm />
                <Segment color='teal'>
                    <Header as='h5' textAlign='center'>Bars</Header>
                </Segment>
            </Container>
        );
    }
}

export default Home;