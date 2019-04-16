import decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser } from '../actions/auth';

const setUserWithToken = (dispatch, token) => {
  //Decode JWT and set to Current User
  setAuthToken(token);
  const decoded = decode(token);
  dispatch(setCurrentUser(decoded));

  return decoded;
};

export default setUserWithToken;
