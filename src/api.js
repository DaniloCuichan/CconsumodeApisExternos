import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.foursquare.com/v3/places',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'fsq3PyZY35V11g5ReDQAZu+R53rqS8FbfV9NL5oHXmTEUAQ='
  }
});

export default api;
