import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

class SearchButton extends Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        query: PropTypes.string.isRequired,
        fetchBars: PropTypes.func.isRequired
    };

    handleClick = (e) => {
        const { fetchBars, query, isAuthenticated } = this.props;
        e.preventDefault();
        e.target.blur();
        fetchBars(query, isAuthenticated);
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


export default SearchButton;