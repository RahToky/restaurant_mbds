import React, { Component } from "react";
import Cartes from "./Cartes";
import ReactBootstrap, { Row, Col, Card, Carousel, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { ShoppingCart, EuroSymbol, PinDrop, ArrowBack, Close } from '@material-ui/icons'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'

class RestaurantDetail extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            showMap: true,
            restaurant: props['restaurant'],
            index: 0,
            direction: null,
            modalShow: false
        }
        setTimeout(this.reverseShowMap, 100);//donner un peu de temps au modal pour bien charger la carte
    };

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction,
        });
    }

    reverseShowMap = () => {
        const showMapCopy = this.state.showMap;
        this.setState(
            { showMap: !showMapCopy }
        )
    }

    render() {
        const { index, direction } = this.state;
        if (Object.keys(this.state.restaurant).length === 0) {
            return (
                <div>
                    <Row style={{ marginTop: 100 }}>
                        <Col md={12}>Restaurant introuvable!</Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Link to="/"><Button variant="primary" ><ArrowBack /> <strong>Les restaurants disponnible</strong></Button></Link>
                        </Col>
                    </Row>
                </div>
            );
        } else {
            let photoResto = this.state.restaurant.cuisine; // ==> this.state.restaurant.photo mais manque de photo
            if (this.state.restaurant.cuisine.includes('/')) {
                photoResto = "czechslovak";
            };
            return (
                <div>
                    <LeafletMap style={{ display: this.state.showMap ? '' : 'none' }}
                        center={[this.state.restaurant.latitude, this.state.restaurant.longitude]}
                        zoom={6}
                        maxZoom={10}
                        attributionControl={true}
                        zoomControl={true}
                        doubleClickZoom={true}
                        scrollWheelZoom={true}
                        dragging={true}
                        animate={true}
                        easeLinearity={0.35}
                    >
                        <TileLayer
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                        <Marker position={[this.state.restaurant.latitude, this.state.restaurant.longitude]}>
                            <Popup>
                                {this.state.restaurant.nom}
                                <p>{this.state.restaurant.telephone}</p>
                            </Popup>
                        </Marker>
                    </LeafletMap>
                        <Button variant="danger" style={{ marginTop: -50, marginLeft: -80, position: 'absolute', zIndex: 7000, display: this.state.showMap ? '' : 'none' }} onClick={this.reverseShowMap}><Close /> <strong>Fermer la carte</strong></Button>
                    <Card className="bg-dark text-white" style={{ display: this.state.showMap ? 'none' : '' }}>
                        <Card.Img src={process.env.PUBLIC_URL + '/img/resto/' + photoResto + '.jpg'} alt="Card image" />
                        <Card.ImgOverlay>
                            <Card.Title><br /><h1>{this.state.restaurant.nom}</h1></Card.Title>
                            <Card.Text>
                                <h2>( cuisine {this.state.restaurant.cuisine} )</h2>
                            </Card.Text>
                            <Card.Text>
                                <h3>{this.state.restaurant.description}</h3>
                            </Card.Text>
                            <Card.Text>
                                <h2>{this.state.restaurant.telephone}</h2>
                            </Card.Text>
                            <Button variant="primary" onClick={this.reverseShowMap}><PinDrop /> <strong>Localisation</strong></Button>
                        </Card.ImgOverlay>
                    </Card>
                    <br/><br/>
                    <h3>Menus</h3>
                    <Carousel activeIndex={index} direction={direction} onSelect={this.handleSelect}>
                        {this.state.restaurant.menus.map(menu => (
                            <Carousel.Item>
                                <img className="d-block w-100" src={process.env.PUBLIC_URL + "/img/autre/black-background.jpg"} alt="First slide" />
                                <Carousel.Caption>
                                    <h3>{menu.nom}</h3>
                                    <h4>Hors-d'œuvre</h4>
                                    <p>{menu.horsdoeuvre}</p>
                                    <h4>Resistance</h4>
                                    <p>{menu.plat}</p>
                                    <h4>Dessert</h4>
                                    <p>{menu.desserts}</p>
                                    <h3>{Math.round(menu.prix * 100) / 100} <EuroSymbol /></h3>
                                    <Button variant="primary"><ShoppingCart /> Commander</Button>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <Cartes plats={this.state.restaurant.plats} />
                </div>
            );
        }
    }
}

export default RestaurantDetail;
