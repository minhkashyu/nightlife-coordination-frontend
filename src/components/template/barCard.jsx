import React, { Component } from 'react';
import { Card, Label, Image, Button, Icon, Menu } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import _ from 'lodash';

class BarCard extends Component {

    static propTypes = {
        bar: PropTypes.object.isRequired,
        goingBars: PropTypes.array.isRequired,
        goingTotals: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        loginGithub: PropTypes.func.isRequired,
        addBar: PropTypes.func.isRequired,
        removeBar: PropTypes.func.isRequired
    };

    renderImage = (bar, goingBar) => {
        let cornerIcon = { as: 'a', color: 'red', corner: 'right', icon: 'heart' };
        let lblGoing = goingBar && this.props.isAuthenticated ? cornerIcon : '';
        if (!bar.photos || bar.photos.length <= 0) {
            return <Image src='/img/image-not-found.png' fluid label={lblGoing} />;
        }
        let imgLink = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${bar.photos[0]['photo_reference']}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
        return <Image src={imgLink} fluid label={lblGoing} />;
    };

    renderTypes = (bar) => {
        if (bar.types.length > 0) {
            return (
                <Label.Group tag>
                    {bar.types.map((type, index) =>
                        <Label key={index} as='a'>{type}</Label>
                    )}
                </Label.Group>
            );
        }
    };

    handleClick = (e, goingBar) => {
        const { isAuthenticated, bar, loginGithub, addBar, removeBar } = this.props;
        if (!isAuthenticated) {
            e.target.blur();
            loginGithub();
        }
        else {
            if (goingBar) {
                e.target.blur();
                removeBar(goingBar['_id']);
            }
            else {
                e.target.blur();
                addBar(bar['place_id'], bar.name, bar['formatted_address']);
            }
        }
    };

    render() {
        const { bar, goingBars, goingTotals, isFetching, isAuthenticated } = this.props;
        let goingBar = _.find(goingBars, { 'placeId': bar['place_id'] });
        let goingTotal = _.find(goingTotals, { '_id': bar['place_id'] });
        let countTotal = goingTotal ? goingTotal.count : 0;
        let goingText = 'Sign in to go';
        let goingColor = 'teal';
        if (isAuthenticated && goingBar) {
            goingText = 'Click to cancel';
            goingColor = 'red';
        }
        if (isAuthenticated && !goingBar) {
            goingText = 'Click to go';
        }
        let mapLink = `https://www.google.com/maps/place/?q=place_id:${bar['place_id']}`;
        return (
            <Card raised>
                {this.renderImage(bar, goingBar)}
                <Card.Content>
                    <a className='header' href={mapLink} target='_blank'>{bar.name}</a>
                    <Card.Meta>
                        <p className='address'>{bar['formatted_address']}</p>
                    </Card.Meta>
                    <Card.Description>
                        {this.renderTypes(bar)}
                    </Card.Description>
                </Card.Content>
                <Button
                    fluid
                    color={goingColor}
                    loading={isFetching}
                    animated='fade'
                    onClick={(e) => this.handleClick(e, goingBar)}
                >
                    <Button.Content visible>
                        <Icon name='favorite' /> {goingText}
                    </Button.Content>
                    <Button.Content hidden>
                        <Icon name='taxi' />
                    </Button.Content>
                </Button>
                <Card.Content extra>
                    <Menu icon='labeled' fluid widths={3}>
                        {bar.rating && <a className='item'><i className='star icon'></i>{bar.rating}</a>}
                        <a className='item'><i className='taxi icon'></i>{countTotal} Going</a>
                        {bar['price_level'] && <a className='item'><i className='dollar icon'></i>{bar['price_level']}</a>}
                    </Menu>
                </Card.Content>
            </Card>
        );
    }
}

export default BarCard;