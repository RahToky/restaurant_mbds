import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ReactBootstrap, { Col, Card, Button } from 'react-bootstrap'
import { ShoppingCart, EuroSymbol } from '@material-ui/icons'

class Carte extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plat: props['plat']
    }
  };
  render() {
    let ingredients = this.state.plat.description.split(",");
    let photo = this.state.plat.type; // ==> this.state.plat.photo mais manque de photo
    if(photo === 'hors d\'oeuvre'){
      photo = "horsdoeuvre";
    };
    return (
      <Card style={{ width: '18rem', minHeight: '650px', marginBottom:20 }}>
        <Card.Img variant="top" src={process.env.PUBLIC_URL + '/img/autre/' + photo+".jpg"} />
        <Card.Body>
          <Card.Title>{this.state.plat.nom}</Card.Title>
          <Card.Text>({this.state.plat.type})</Card.Text>
          <Card.Text>
            <ul>
            {ingredients.map(ingredient => (
              <li>{ ingredient }</li>
            ))}
            </ul>
          </Card.Text>
          <Button variant="primary"><ShoppingCart /> Commander</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Carte;