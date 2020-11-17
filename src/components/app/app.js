import React, { Component } from 'react';

import { Header } from '../header/header';
import { RandomPlanet } from '../random-planet/random-planet';
import { ItemList } from '../people-page/item-list/item-list';
import { PersonDetails } from '../people-page/person-details/person-details';
import { SwapiService } from '../../services/app-service'
import './app.css';
import { PeoplePage } from '../people-page/people-page';

export class App extends Component {

  state = {
    showRandomPlanet: true,
    selectedPerson: 5
  };

  swapiService = new SwapiService();

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  onPersonSelected = (id) => {
    this.setState({ selectedPerson: id });
  }

  render() {

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet /> :
      null;

    return (
      <div className="stardb-app">
        <Header />
        { planet}

        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>
        <div><PeoplePage /></div>
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected} getData={this.swapiService.getAllPlanets} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>
      </div>
    );
  }
}