import React, { Component } from 'react';
import './App.css';
import base from './base';
import NavBar from './components/NavBar'
import paginate from 'paginate-array';
import RestaurantDetail from "./components/RestaurantDetail";
import Restaurants from './components/Restaurants';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import PanierModal from "./components/PanierModal";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      recherche: '',
      restaurants: [],
      size: 10,
      page: 1,
      currPage: {/* data: [{ id:'2qf132q', nom: "22 Teutonic Ave.", cuisine: "german", latitude: "", longitude: "", menus: [] }] */ },
      commande:
      {
        menus: [
          {
            nom: 'menu1',
            prix: 9,
            quantite: 2,
            horsdoeuvre: { nom: 'horsdoeuvre' }
          },
          {
            nom: 'menu2',
            prix: 12,
            quantite: 2
          }
        ],
        cartes: [
          { nom: 'carte1', quantite: 2, prix: 10 },
          { nom: 'carte2', quantite: 1, prix: 15 }
        ],
        prix: 77
      }
    };

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    const { restaurants, size } = this.state;

    const newCurrPage = paginate(restaurants, pageNumber, size);

    this.setState({
      ...this.state,
      currPage: newCurrPage
    });
  }

  componentWillMount() {
    base.fetch('restaurants', {
      context: this,
      asArray: true,
      then(data) {
        const { page, size } = this.state;

        const currPage = paginate(data, page, size);
        // console.log(currPages);
        this.setState({
          ...this.state,
          restaurants: data,
          currPage
        });
      }
    });
    // this runs right before the <App> is rendered
  };

  ajouterCarteDansPanier = (carte) => {
    let commande = this.state.commande;
    this.state.commande.cartes.map(c => {
      if(c.nom.toLowerCase() !== carte.nom.toLowerCase()){
        this.setState({

        })
      }
    })
  }

  listerRestaurant = (restaurants, paginations) => {
    let motCle = this.state.recherche;
    if (motCle !== '') {
      let results = [];
      restaurants.find(function (el) {
        if (el.nom.toLowerCase().includes(motCle) || el.cuisine.toLowerCase().includes(motCle)) {
          results.push(el);
        }
      })
      return (<>
        <PanierModal
          restaurants={this.state.restaurants}
          commande={this.state.commande}
          show={this.state.modalShow}
          onHide={this.fermerPanier}
        />
        <Restaurants restaurants={results} pagination={paginations} />
      </>)
    } else {
      return (<>
        <PanierModal
          restaurants={this.state.restaurants}
          commande={this.state.commande}
          show={this.state.modalShow}
          onHide={this.fermerPanier}
        />
        <Restaurants restaurants={restaurants} pagination={paginations} />
      </>)
    }
  }

  detailRestaurant = ({ match }) => {
    let restaurant = {};
    if (this.state.currPage['data'] !== undefined)
      restaurant = this.state.currPage['data'][match.params.index]
    return (
      <>
        <PanierModal
          restaurants={this.state.restaurants}
          commande={this.state.commande}
          show={this.state.modalShow}
          onHide={this.fermerPanier}
        />
        <RestaurantDetail restaurant={restaurant} /></>)
  }

  rechercherRestaurants = (event) => {
    let motCle = event.target.value.toLowerCase();
    this.setState(() => ({
      recherche: motCle
    }))
  }

  ouvrirPanier = () => {
    this.setState({
      modalShow: true
    })
  }

  fermerPanier = () => {
    this.setState({
      modalShow: false
    })
  }

  render() {
    const listerRestaurant = () => {
      return this.listerRestaurant(this.state.currPage['data'], {
        page: this.state.page,
        size: this.state.size,
        length: this.state.restaurants.length,
        onChange: this.handlePageChange
      });
    };

    return (
      <div className="App">
        <Router>
          <NavBar onClick={this.rechercherRestaurants} ouvrirPanierEvent={this.ouvrirPanier} />
          <Route exact path="/" component={listerRestaurant} />
          <Route path="/detailRestaurant/:index" component={this.detailRestaurant} />
        </Router>
      </div>
    );
  }

}

export default App;
