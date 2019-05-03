import axios from 'axios';
import setAuthToken from '../../util/setAuthToken';
import setUserWithToken from '../../util/setUserWithToken';

export const registerUser = (user, history) => async dispatch => {
  try {
    const { data } = await axios.post('/api/auth/register', user);
    if (data) history.push('/login');
  } catch (err) {
    dispatch({
      type: 'GET_ERRORS',
      errors: err.response.data,
    });
  }
};

export const loginUser = user => async dispatch => {
  try {
    //Send email and password to server to get JWT
    const { data } = await axios.post('/api/auth/login', user);
    const { token } = data;

    localStorage.setItem('jwt', token);
    setUserWithToken(dispatch, token);
  } catch (err) {
    dispatch({
      type: 'GET_ERRORS',
      errors: err.response.data,
    });
  }
};

export const loginWithFirebase = firebaseToken => async dispatch => {
  try {
    // exchange firebase token for back-end JWT
    const { data } = await axios.post('/api/auth/firebase', { firebaseToken });
    const { token } = data;

    localStorage.setItem('jwt', token);
    setUserWithToken(dispatch, token);
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
  localStorage.removeItem('jwt');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch({
    type: 'LOG_OUT',
  });
};
