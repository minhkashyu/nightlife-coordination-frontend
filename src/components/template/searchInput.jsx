import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

class SearchInput extends Component {
    static propTypes = {
        resetResults: PropTypes.func.isRequired,
        selectResult: PropTypes.func.isRequired,
        loadGooglePlacesAutocomplete: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        results: PropTypes.array.isRequired
    };

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
        this.props.selectResult(value);
        this.props.loadGooglePlacesAutocomplete(value);
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

export default SearchInput;