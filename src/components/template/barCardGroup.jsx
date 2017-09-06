import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

import BarCard from './barCard.jsx';

class BarCardGroup extends Component {
    static propTypes = {
        bars: PropTypes.array.isRequired
    };

    render() {
        return (
            <Card.Group itemsPerRow='3' >
                {this.props.bars.map((bar, index) =>
                    <BarCard key={index} bar={bar} {...this.props} />
                )}
            </Card.Group>
        );
    }
}

export default BarCardGroup;