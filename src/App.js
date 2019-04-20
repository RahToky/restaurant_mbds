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
      currPage: {/* data: [{ id:'2qf132q', nom: "22 Teutonic Ave.", cuisine: "german", latitude: "", longitude: "", menus: [] }] */ }
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

  moins() {
    alert("moins")
  }

  plus() {
    alert("plus")
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
          show={this.state.modalShow}
          onHide={this.fermerPanier}
        />
        <Restaurants restaurants={results} pagination={paginations} />
      </>)
    } else {
      return (<>
        <PanierModal
          restaurants={this.state.restaurants}
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

/*
<Pagination
  activePage={this.state.page}
  itemsCountPerPage={this.state.size}
  totalItemsCount={this.state.restaurants.length}
  pageRangeDisplayed={5}
  onChange={this.handlePageChange} />


  Mr donne = 47.500x5 = 237.500 + 10.000 => 250.000
  Mr zananay = 27.500 x5 = 137.500
  Mr moris = 47.500x4 = 190.000
  Totoa Herisoa = 17.500x6 = 105.000

  sosisy 4
  sosisy 4 (pork)
  kotleta 3
  henakisoa tsy atao fa alahady
*/





















/*/*
      Object.keys(this.state.currPage).map((key, index) => (
        <p>index={index}</p>
      ))
    };
    /*
    <GridRestaurant post={this.state.currPage["data"][index]} onClick={this.test} />
    <Pagination
      activePage={this.state.page}
      itemsCountPerPage={this.state.size}
      totalItemsCount={this.state.restaurants.length}
      pageRangeDisplayed={5}
    onChange={this.handlePageChange}/>;};
    return <p>liste restaurant</p>*/