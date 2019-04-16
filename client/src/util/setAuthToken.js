import axios from 'axios';

// Set default header in axios to "Authorization: token"
// to access private api routes without having to put headers on every request
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
