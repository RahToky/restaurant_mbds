import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Home, Book, AccountBox } from '@material-ui/icons'
import Carte from "./Carte"
import ReactBootstrap, { Row, Col, Card, Button } from 'react-bootstrap'


class Cartes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plats: props['plats']
    }
  };
  render() {
    const plats = this.state.plats;

    return (
      <div style={{ marginTop: 20, padding: 30 }}>
        <h2>Cartes</h2><hr/>
        <Row style={{backgroundColor:'#eeeeee', paddingTop:20, paddingBottom:20}}>
          {plats.map(plat => (
            <Col>
              <Carte plat={plat} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default Cartes;
