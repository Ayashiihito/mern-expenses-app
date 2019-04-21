import decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser } from '../redux/actions/auth';

const setUserWithToken = (dispatch, token) => {
  //Decode JWT and set Current User
  setAuthToken(token);
  const decoded = decode(token);
  dispatch(setCurrentUser(decoded));

  return decoded;
};

export default setUserWithToken;
