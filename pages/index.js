import React, { Component } from 'react';
import { Container, Divider, Grid, Button } from 'semantic-ui-react';

import * as api from '../api';
import Header from '../components/Header';
import PlanetSelector from '../components/PlanetSelector';
import VehiclesSelector from '../components/VehicleSelector';
import Footer from '../components/Footer';
import Router from 'next/router';

const { Column, Row } = Grid;

export default class Index extends Component {

  static async getInitialProps(ctx) {
    try {
      const planets = (await api.getPlanets()).data;
      const vehicles = (await api.getVehicles()).data;
      return {
        planets,
        vehicles
      };
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  state = {
    planets: [],
    vehicles: [],
    selectedPlanets: ['', '', '', ''],
    selectedVehicles: ['', '', '', '']
  }

  componentDidMount() {
    const { planets, vehicles } = this.props;
    this.setState({ planets, vehicles });
  }

  planetChange = (v, i) => {
    const oldState = this.state.selectedPlanets;
    oldState[parseInt(i) - 1] = v;
    if (
      this.state.selectedVehicles[parseInt(i) - 1].length && 
      this.state.vehicles[this.state.vehicles.findIndex(x => x.name === this.state.selectedVehicles[parseInt(i) - 1])].max_distance < 
      this.state.planets[this.state.planets.findIndex(x => x.name === v)].distance
    ) {
      const oldVeh = this.state.selectedVehicles;
      oldVeh[parseInt(i) - 1] = '';
      this.setState({ selectedPlanets: oldState,  selectedVehicles: oldVeh});
    } else
      this.setState({ selectedPlanets: oldState });
  } 
   
  vehicleChange = (v, i) => {
    const oldState = this.state.selectedVehicles;
    oldState[parseInt(i) - 1] = v;
    this.setState({ selectedVehicles: oldState });
  }

  get planetOptions() {
    return this.state.planets && this.state.planets.map(x => {
      return {
        text: x.name,
        value: x.name,
        key: x.name,
        disabled: this.state.selectedPlanets.includes(x.name)
      }
    }) || [];
  }

  get vehiclesOptions() {
    return this.state.vehicles && this.state.vehicles.map(x => {
      return {
        ...x,
        left: x.total_no - this.state.selectedVehicles.filter(y => y === x.name).length
      }
    }) || [];
  }

  get timeTaken() {
    let timeTaken = 0;
    const { selectedPlanets, planets, vehicles } = this.state;
    this.state.selectedVehicles.forEach((x, i) => {
      if (x.length && selectedPlanets[i].length) {
        const { distance } = planets[planets.findIndex(y => y.name === selectedPlanets[i])];
        const { speed } = vehicles[vehicles.findIndex(y => y.name === x)];
        timeTaken += parseInt(distance)/parseInt(speed); 
      }
    });
    return timeTaken;
  }

  reset = () => {
    this.setState({ selectedPlanets: ['', '', '', ''], selectedVehicles: ['', '', '', ''] });
  }

  get canSubmit() {
    return this.state.selectedPlanets.every(x => x.length) && this.state.selectedVehicles.every(x => x.length)
  }

  findFalcone = () => {
    if (!this.canSubmit) alert('Cannot Submit!');
    Router.push({
      pathname: '/result',
      query: {
        selectedPlanets: this.state.selectedPlanets,
        selectedVehicles: this.state.selectedVehicles,
        timeTaken: this.timeTaken
      }
    })
  }

  render() {
    const { selectedPlanets, selectedVehicles } = this.state;
    return (
      <Container>
        <Header reset={this.reset}/>
        <h2 style={{ textAlign: 'center' }}>Time Taken: {this.timeTaken}</h2>
        <h3 style={{ textAlign: 'center' }}>Select planets you want to search in:</h3>
        <Divider />
        <Grid>
          <Row>
            {[0,1,2,3].map(x => {
              return (
                <Column mobile={16} tablet={8} computer={4} key={x}>
                  <PlanetSelector destination={x+1} value={selectedPlanets[x]} planetChange={this.planetChange} options={this.planetOptions} />
                  {selectedPlanets[x].length ? 
                    <VehiclesSelector destination={x+1} value={selectedVehicles[x]} vehicleChange={this.vehicleChange} options={this.vehiclesOptions} planets={this.state.planets} planet={selectedPlanets[x]}/> 
                  : null}
                </Column>
              );
            })}
          </Row>
          <Button content='Find Falcone!' style={{ display: 'block', margin: 'auto' }} primary disabled={!this.canSubmit} onClick={this.findFalcone}/>
        </Grid>
        <Footer />
      </Container>
    );
  }
}