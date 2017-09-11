import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

import BarItem from './barItem.jsx';

class BarItemGroup extends Component {
    static propTypes = {
        bars: PropTypes.array.isRequired
    };

    render() {
        const { bars } = this.props;
        return (
            <Comment.Group>
                {bars.length > 0 && bars.map((bar, index) =>
                    <BarItem key={index} bar={bar} {...this.props} />
                )}
                {bars.length <= 0 &&
                    <p className='msg-text'>There is no acitivity log.</p>
                }
            </Comment.Group>
        );
    }
}

export default BarItemGroup;