import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

import BarItem from './barItem.jsx';

class BarItemGroup extends Component {
    static propTypes = {
        bars: PropTypes.array.isRequired
    };

    render() {
        return (
            <Comment.Group>
                {this.props.bars.map((bar, index) =>
                    <BarItem key={index} bar={bar} {...this.props} />
                )}
            </Comment.Group>
        );
    }
}

export default BarItemGroup;