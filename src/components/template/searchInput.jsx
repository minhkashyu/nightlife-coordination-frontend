import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { Cookies } from 'react-cookie';

class SearchInput extends Component {
    static propTypes = {
        resetResults: PropTypes.func.isRequired,
        selectResult: PropTypes.func.isRequired,
        loadGooglePlacesAutocomplete: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        cookies: PropTypes.instanceOf(Cookies).isRequired,
        results: PropTypes.array.isRequired,
        query: PropTypes.string.isRequired
    };

    componentWillMount() {
        this.props.resetResults();
        this.state = { componentValue: '', flag: true };
        if (!this.props.isAuthenticated || (this.props.isAuthenticated && !this.props.cookies.get('lastLocation'))) {
            this.setState({
                flag: false
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        // if already logged in and having 'lastLocation' cookie, set query to componentValue once
        if (nextProps.query !== this.props.query && this.state.flag) {
            this.setState({
                componentValue: nextProps.query,
                flag: false
            });
        }
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
            this.props.selectResult(value);
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

export default SearchInput;