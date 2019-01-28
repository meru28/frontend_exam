import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage.jsx'
import ManageMovies from './components/ManageMovies';
import ManageCategories from './components/ManageCategories';
import MovieCategory from './components/MovieCategory';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header navBrand={"Movie"}/>
        <div>
          <Route exact path="/" component={HomePage}/>
          <Route path="/movie" component={ManageMovies}/>
          <Route path="/kategori" component={ManageCategories}/>
          <Route path="/moviecategory" component={MovieCategory}/>
        </div>
      </div>
    );
  }
}

export default App;
