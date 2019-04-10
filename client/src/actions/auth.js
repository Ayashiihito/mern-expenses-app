import axios from 'axios';
import decode from 'jwt-decode';
import setAuthToken from '../util/setAuthToken';

export const registerUser = (user, history) => dispatch => {
  axios.post('/api/users/register', user).catch(err =>
    dispatch({
      type: 'GET_ERRORS',
      errors: err.response.data,
    })
  );
  history.push('/login');
};

export const loginUser = user => async dispatch => {
  try {
    const { data } = await axios.post('/api/users/login', user);
    const { token } = data;

    localStorage.setItem('jwtToken', token);
    setAuthToken(token);

    const decodedToken = decode(token);
    dispatch(setCurrentUser(decodedToken));
  } catch (err) {
    dispatch({
      type: 'GET_ERRORS',
      errors: err.response.data,
    });
  }
};

export const setCurrentUser = decoded => ({
  type: 'SET_CURRENT_USER',
  decoded,
});

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
