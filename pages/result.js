import React, { Component } from 'react';
import { Container, Placeholder, Button } from 'semantic-ui-react';
import Router, { withRouter } from 'next/router'

import Header from '../components/Header';
import * as api from '../api';
import Footer from '../components/Footer';

class Result extends Component {

    async componentDidMount() {
        try {
            const { token } = (await api.getToken()).data;
            const selectedPlanets = this.props && this.props.router 
            && this.props.router.query && this.props.router.query.selectedPlanets || [];
            const selectedVehicles = this.props && this.props.router 
            && this.props.router.query && this.props.router.query.selectedVehicles || [];
            const timeTaken = this.props && this.props.router 
            && this.props.router.query && this.props.router.query.timeTaken || 0;
            if (selectedPlanets.every(x => x.length) && selectedVehicles.every(x => x.length) && token.length) {
                const { data } = await api.findFalcone({
                    token,
                    planet_names: selectedPlanets,
                    vehicle_names: selectedVehicles
                });
                if (data.status === 'success') {
                    this.setState({ planetName: data.planet_name, timeTaken  });
                } else {
                    this.setError()
                }
            } else {
                this.setError()
            }
        } catch (e) {
            this.setError();   
        }
    }

    get startAgain() {
        return <Button content='Start Again!' style={{ display: 'block', margin: 'auto' }} primary onClick={() => Router.push('/')}/>
    }

    setError = () => {
        this.setState({ showError: true })
    }

    render() {
        return(
            <Container>
                <Header />
                {this.state && this.state.planetName ? (
                <div>
                    <h3 style={{textAlign: 'center'}}>Success! Congratulations on Finding Falcone. King Shan is mighty pleased.</h3>
                    <h2 style={{textAlign: 'center'}}>Time Taken: {this.state.timeTaken}</h2>
                    <h2 style={{textAlign: 'center'}}>Planet found: {this.state.planetName}</h2>
                    { this.startAgain }
                </div>) : this.state && this.state.showError ? <><h3 style={{textAlign: 'center'}}>Uh-oh! Falcone couldn't be found!</h3>{ this.startAgain }</>
                : (<Placeholder>
                        <Placeholder.Header>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        </Placeholder.Header>
                </Placeholder>) 
                }
                <Footer />
            </Container>
        );
    }
}

export default withRouter(Result);