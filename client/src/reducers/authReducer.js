import isEmpty from '../util/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        isAuthenticated: !isEmpty(action.decoded),
        user: action.decoded,
      };
    default:
      return state;
  }
};
