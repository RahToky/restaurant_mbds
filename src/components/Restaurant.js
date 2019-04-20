import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ReactBootstrap, { Row, Col, Card, Button } from 'react-bootstrap'

function Restaurant(props) {
  const { post, onClick } = props;
  console.log("--> post: " + JSON.stringify(post));
  if (post == undefined) {
    return <p>l'index du restaurant est incorrect!</p>
  }
  
  let photoResto = post.cuisine; // ==> this.state.restaurant.photo mais manque de photo
  if(photoResto.includes('/')){
      photoResto = "czechslovak";
  };

  return (
    <Card style={{backgroundColor:'#eee'}}>
      <Card.Img variant="top" src={process.env.PUBLIC_URL + '/img/resto/'+photoResto+".jpg"} />
      <Card.Body>
        <Card.Text>
          <h4><strong>{post.nom}</strong></h4>
          <p style={{color:'gray'}}>Cuisine {post.cuisine}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Restaurant;