import React, { Component } from 'react';
import { SwapiService } from '../../services/app-service'
import { Spinner } from '../spinner/spinner';
import { ErrorIndicator } from '../error-indicator/error-indicator'
import './random-planet.css';

export class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false,
  };

  constructor() {
    super();
    this.updatePlanet();
    setInterval(this.updatePlanet, 2500);
  }
  onError = () => {
    this.setState(
      { error: true, loading: false }
    );
  }
  onPlanetLoaded = (planet) => {
    this.setState({ planet, loading: false });
  };

  updatePlanet = () => {
    console.log('updated');
    const id = Math.floor(Math.random() * 25) + 2
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded).catch(this.onError);
  }

  render() {
    const { planet, loading, error } = this.state;
    const err = error ? <ErrorIndicator /> : null;
    const hasData = !(loading || err)
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
        {err}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {

  const { id, name, population,
    rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};