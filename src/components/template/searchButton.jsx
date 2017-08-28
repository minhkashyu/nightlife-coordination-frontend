import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { fetchBars } from './../../actions/search';

class SearchButton extends Component {

    handleClick = (e) => {
        const { fetchBars, query } = this.props;
        e.preventDefault();
        e.target.blur();
        fetchBars(query);
    };

    render() {
        return (
            <Button
            loading={this.props.isFetching}
            fluid
            animated='fade'
            onClick={this.handleClick}
            >
                <Button.Content visible>
                    <Icon name='search' /> Search
                </Button.Content>
                <Button.Content hidden>
                    <Icon color='teal' name='bar' />
                </Button.Content>
            </Button>
        );
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.common.isFetching,
        query: state.search.query
    };
};

export default connect(mapStateToProps, { fetchBars })(SearchButton);