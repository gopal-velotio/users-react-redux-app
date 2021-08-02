import axios from 'axios';

const APP_ID = '610809ad90e2ff9b030b5fcd';

const instance = axios.create({
    baseURL: 'https://dummyapi.io/data/api/',
    headers: { 'app-id': APP_ID}
});

export default instance;