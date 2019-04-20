import React, { Component } from 'react';
//import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, Book, AccountBox, ShoppingCart, EuroSymbol } from '@material-ui/icons'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TextField } from '@material-ui/core';
import ReactBootstrap, { Jumbotron, Button, Col, Grid, Panel, FormGroup, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap'

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onClick: props['onClick'],
            ouvrirPanierEvent: props['ouvrirPanierEvent'],
            prixTotalPanier: props['prixTotalPanier']
        }
    };

    render() {
        return (
            <div>
                <Navbar fixed="top" bg="primary" variant="dark">
                    <Link to="/"><Navbar.Brand>Accueil</Navbar.Brand></Link>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home"></Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="recherche" className="mr-sm-2" onChange={this.state.onClick.bind(this)} />
                    </Form>
                    <Button variant="outline-light" onClick={this.state.ouvrirPanierEvent}>
                        <ShoppingCart />
                    </Button>
                </Navbar><br /><br />
            </div>
        )
    }
}


export default NavBar;