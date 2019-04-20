import React, { Component } from 'react';
import ReactBootstrap, { ListGroup, Button, Modal, Table, Collapse } from 'react-bootstrap'
import { Check, Close, ShoppingCart, EuroSymbol, AddCircle, RemoveCircle } from '@material-ui/icons'

class PanierModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: props['restaurants'],
            commande:props['commande']
        }
    };

    render() {
        if (this.state.restaurants === undefined)
            return <></>
        const restaurants = this.state.restaurants;
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ fontSize: 11 }}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <ShoppingCart /> Mes commandes ({this.state.commande.prix}<EuroSymbol/>)
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Carte:</h5>
                    <ul>
                        {this.state.commande.cartes.map(carte=>(
                            <li>{carte.nom}</li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}><Close /> Annuler mes commandes</Button>
                    <Button variant="success" onClick={this.props.onHide}><Check /> Prendre</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default PanierModal;