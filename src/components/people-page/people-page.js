import React, { Component } from 'react';

import { ItemList } from './item-list/item-list';
import { PersonDetails } from './person-details/person-details';
import { ErrorIndicator } from '../error-indicator/error-indicator';
import { ErrorBoundry } from './error-boundry/error-boundry'
import { ErrorButton } from '../error-button/error-button'
import './people-page.css';
import { SwapiService } from '../../services/app-service';

const Row = ({ left, right }) => {
  return (
    <div className="row mb2">
      <div className="col-md-6">
        {left}
      </div>
      <div className="col-md-6">
        {right}
      </div>
    </div>
  )
}

export class PeoplePage extends Component {

  state = {
    selectedPerson: 3,
  };

  swapiService = new SwapiService();

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {
    const itemList = (
      <ItemList onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}>
        {(i) => `${i.name} (${i.birthYear})`}
      </ItemList>
    );
    const personDetails = (
      <PersonDetails personId={this.state.selectedPerson} />
    );
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return (
      <ErrorBoundry>
        <Row left={itemList} right={personDetails} />
        <ErrorButton />
      </ErrorBoundry>
    );
  }
}
