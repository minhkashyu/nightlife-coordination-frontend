import React, { Component } from 'react';
import { Card, Label, Image, Button, Icon, Menu } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

class BarCard extends Component {
    static propTypes = {
        bar: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        isAuthenticated: PropTypes.bool.isRequired
    };

    renderImage = (bar) => {
        if (!bar.photos || bar.photos.length <= 0) {
            return <Image src='/img/image-not-found.png' fluid label={{ as: 'a', color: 'red', corner: 'right', icon: 'heart' }} />;
        }
        let imgLink = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${bar.photos[0]['photo_reference']}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
        return <Image src={imgLink} fluid label={{ as: 'a', color: 'red', corner: 'right', icon: 'heart' }} />;
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

    render() {
        const { bar, isFetching } = this.props;

        let mapLink = `https://www.google.com/maps/place/?q=place_id:${bar['place_id']}`;
        return (
            <Card raised>
                {this.renderImage(bar)}
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
                    color='teal'
                    loading={isFetching}
                    animated='fade'
                >
                    <Button.Content visible>
                        <Icon name='favorite' /> Going
                    </Button.Content>
                    <Button.Content hidden>
                        <Icon name='taxi' />
                    </Button.Content>
                </Button>
                <Card.Content extra>
                    <Menu icon='labeled' fluid widths={3}>
                        {bar.rating && <a className='item'><i className='star icon'></i>{bar.rating}</a>}
                        <a className='item'><i className='taxi icon'></i>0 Going</a>
                        {bar['price_level'] && <a className='item'><i className='dollar icon'></i>{bar['price_level']}</a>}
                    </Menu>
                </Card.Content>
            </Card>
        );
    }
}

export default BarCard;