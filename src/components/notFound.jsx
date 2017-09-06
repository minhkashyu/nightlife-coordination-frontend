import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
    render() {
        return (
            <Container className='main-wrapper'>
                <Header as='h1' textAlign='center'>404</Header>
                <Header as='h3' textAlign='center' dividing>Page not found!</Header>
                <Segment>
                    <p>The page you were looking for cannot be found!</p>
                    <p>
                        <Link to="/">Go back to the main page</Link>
                    </p>
                </Segment>
            </Container>
        );
    }
}

export default NotFound;