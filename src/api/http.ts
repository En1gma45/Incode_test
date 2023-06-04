import axios from 'axios';

const API_URL = 'https://swapi.dev/api/';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export default $api;
