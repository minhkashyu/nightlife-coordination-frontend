import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Segment, Message, Header, Icon } from 'semantic-ui-react';

import { fetchMyBars, removeBar } from './../actions/search';
import BarItemGroup from './template/barItemGroup.jsx';
import SiteLoader from './template/siteLoader.jsx';

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

    renderLogs = () => {
        if (this.props.isFetching) {
            return <SiteLoader />;
        }
        else {
            return <BarItemGroup {...this.props} />;
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
                <Segment>
                    {this.renderError()}
                    {this.renderLogs()}
                </Segment>
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