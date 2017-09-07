import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Message, Header, Icon } from 'semantic-ui-react';

import { fetchMyBars, removeBar } from './../actions/search';
import BarItemGroup from './template/barItemGroup.jsx';

class ActivityLog extends React.Component {

    componentWillMount() {
        this.props.fetchMyBars();
    }

    renderError = () => {
        const { errorMessage } = this.props;
        if (errorMessage) {
            return <Message error header='Error!' content={errorMessage} />;
        }
    };

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
            <Container className='main-wrapper'>
                <Header as='h5' icon textAlign='center' color='teal'>
                    <Icon name='history' circular inverted color='teal' />
                    <Header.Content>Activity Log</Header.Content>
                </Header>
                {this.renderError()}
                <BarItemGroup {...this.props} />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.search.error,
        bars: state.search.bars,
        goingBars: state.search.goingBars,
        isFetching: state.common.isFetching,
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps, { fetchMyBars, removeBar })(ActivityLog);