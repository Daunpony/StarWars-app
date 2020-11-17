import React, { Component } from 'react';

import { Header } from '../header/header';
import { PeoplePage } from '../people-page/people-page';
import { RandomPlanet } from '../random-planet/random-planet';

import './app.css';

export class App extends Component {

  state = {
    showRandomPlanet: true,
    selectedPerson: 5
  };

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
        <PeoplePage />
      </div>
    );
  }
}