import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Home, Book, AccountBox } from '@material-ui/icons'
import Restaurant from "./Restaurant";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactLoading from 'react-loading';
import Pagination from "react-js-pagination";
import ReactBootstrap, { Col, Row } from 'react-bootstrap'

class Restaurants extends Component {
    constructor(props) {
        super(props);
        console.log("json=" + JSON.stringify(props['restaurants']));
        this.state = {
            restaurants: props['restaurants'],
            pagination: props['pagination']
        }
    };

    test(restau) {
        alert(restau);
    };

    render() {
        const { page, size, length, onChange } = this.state.pagination;

        if (this.state.restaurants == undefined)
            return <Row className="justify-content-md-center" style={{marginTop:100}}><Col sm={2}><ReactLoading type='bubbles' color='#1E90FF' height='150px' width='150px' /></Col></Row>;
        return (
            <div style={{ marginTop: 20}}>
                <h2 className="text-primary">Choisissez votre restaurant</h2>
                <Row>
                    {this.state.restaurants.map((key, index) => (
                        <Col sm={6} style={{ marginBottom: 20, padding: 30 }}>
                            <Link to={'/detailRestaurant/' + index}><Restaurant post={this.state.restaurants[index]} onClick={this.test} /></Link>
                        </Col>
                    ))}
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={{ span: 4, offset: 4 }}>
                        <h3><Pagination
                            activePage={page}
                            itemsCountPerPage={size}
                            totalItemsCount={length}
                            pageRangeDisplayed={15}
                            onChange={onChange} /></h3>
                    </Col>
                </Row>
            </div >
        );
    }
}

export default Restaurants;

/*<Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={length}
                    pageRangeDisplayed={5}
                    onChange={onChange} />*/