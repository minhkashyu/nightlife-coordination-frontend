import React, { Component } from 'react';
import { Comment, Button, Icon } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

class BarItem extends Component {

    static propTypes = {
        bar: PropTypes.object.isRequired,
        goingBars: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        removeBar: PropTypes.func.isRequired
    };

    handleClick = (e, goingBar) => {
        e.target.blur();
        this.props.removeBar(goingBar['_id']);
    };

    render() {
        const { bar, goingBars, isFetching } = this.props;
        let goingBar = _.find(goingBars, { '_id': bar['_id'] });
        let mapLink = `https://www.google.com/maps/place/?q=place_id:${bar.placeId}`;
        return (
            <Comment>
                <Comment.Avatar src='/img/image-not-found.png' />
                <Comment.Content>
                    <a className='author' href={mapLink} target='_blank'>{bar.name}</a>
                    <Comment.Metadata>
                        <div>{moment(bar.createdAt).calendar()}</div>
                    </Comment.Metadata>
                    <Comment.Text>{bar.address}</Comment.Text>
                    { goingBar &&
                        <Comment.Actions>
                            <Comment.Action>
                                <Button
                                    basic
                                    color='red'
                                    loading={isFetching}
                                    animated='fade'
                                    onClick={(e) => this.handleClick(e, goingBar)}
                                >
                                    <Button.Content visible>
                                        <Icon name='trash' /> Click to cancel going
                                    </Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='trash outline' />
                                    </Button.Content>
                                </Button>
                            </Comment.Action>
                        </Comment.Actions>
                    }
                </Comment.Content>
            </Comment>
        );
    }
}

export default BarItem;