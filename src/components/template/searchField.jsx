import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { resetResults, selectResult, loadGooglePlacesAutocomplete } from './../../actions/search';

class searchField extends Component {
    componentWillMount() {
        this.resetComponent();
    }

    resetComponent = () => {
        this.setState({ componentValue: '' });
        this.props.resetResults();
    };

    handleResultSelect = (e, { result }) => {
        this.setState({ componentValue: result.title  });
        this.props.selectResult(result.title);
    };

    handleSearchChange = (e, { value }) => {
        this.setState({ componentValue: value });
        if (value.length < 1) return this.resetComponent();
        setTimeout(() => {
            this.props.loadGooglePlacesAutocomplete(value);
        }, 500);
    };

    render() {
        const { isFetching, results } = this.props;
        const { componentValue } = this.state;

        return (
            <Search
                loading={isFetching}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                placeholder='Where to tonight...'
                results={results}
                value={componentValue}
                input={{ fluid: true, icon: 'marker', iconPosition: 'left' }}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.common.isFetching,
        errorMessage: state.search.error,
        results: state.search.results
    };
};

export default connect(mapStateToProps, { resetResults, selectResult, loadGooglePlacesAutocomplete })(searchField);