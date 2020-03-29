import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://findfalcone.herokuapp.com',
    timeout: 3000
});

const getPlanets = () => instance.get('/planets');

const getVehicles = () => instance.get('/vehicles');

const getToken = () => 
    instance.post('/token', {}, {
        headers: {
            'Accept': 'application/json',
        }
    });

const  findFalcone = data => instance.post('/find', data, { headers: { Accept: 'application/json' } });

module.exports = {
    getPlanets,
    getVehicles,
    getToken,
    findFalcone
}