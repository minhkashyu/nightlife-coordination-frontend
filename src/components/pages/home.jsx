import React from 'react';
import { Container, Header, Segment, Dimmer, Loader } from 'semantic-ui-react';

class Home extends React.Component {
    render() {
        return (
            <Container style={{ marginTop: '3em' }}>
                <Header as='h1' textAlign='center'>Nightlife Coordination App</Header>
                <Header as='h3' textAlign='center' dividing>A Freecodecamp Full-Statck Project using React/Redux, Semantic UI with Google Material theme, Express, Passport and MongoDB</Header>
                <Segment>
                    <Dimmer active>
                        <Loader content='Loading' />
                    </Dimmer>
                </Segment>
            </Container>
        );
    }
}

export default Home;