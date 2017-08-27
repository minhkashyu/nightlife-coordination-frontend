import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Message, Button, Icon } from 'semantic-ui-react';
import SearchField from './searchField.jsx';
import { fetchBars } from './../../actions/search';

class SearchForm extends Component {

    handleClick = (e) => {
        const { fetchBars, placeId } = this.props;
        e.preventDefault();
        fetchBars(placeId);
    };

    render() {
        return (
                <Grid>
                    <Grid.Column width={12}>
                        <SearchField />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Button
                            fluid
                            animated='fade'
                            onClick={this.handleClick}
                        >
                            <Button.Content visible>
                                <Icon name='bar' /> Search
                            </Button.Content>
                            <Button.Content hidden>
                                <Icon color='teal' name='right arrow' />
                            </Button.Content>
                        </Button>
                    </Grid.Column>
                </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        placeId: state.search.placeId,
        errorMessage: state.search.error
    };
};

export default connect(mapStateToProps, {fetchBars})(SearchForm);