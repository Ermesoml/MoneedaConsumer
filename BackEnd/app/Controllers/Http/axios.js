var axios = require('axios');

const API_URL = process.env.MONEEDA_API_URL;
const MONEEDA_API_KEY = process.env.MONEEDA_API_KEY;

module.exports = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + MONEEDA_API_KEY
  }
})