const initialState = {
  isFirstLoad: true,
  isFetching: false,
  expenses: [],
  expTypes: [],
  modals: {
    addType: false, // doesn't work without predefining modal's state?
  },
  filters: {
    //maybe it shouldn't be here
    // TODO: change to date.now - 1 year?
    from: new Date('1/1/19'),
    to: new Date(),
    order: 'NEW_FIRST',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ON_FIRST_LOAD':
      return {
        ...state,
        isFirstLoad: false,
      };
    case 'FETCH_ALL':
      return {
        ...state,
        expenses: [
          ...action.expenses.map(expense => {
            //make dates from stings
            //needed for date range selection
            expense.date = new Date(expense.date);
            return expense;
          }),
        ],
        expTypes: [...action.expTypes],
      };
    case 'FETCH_START':
    case 'FETCH_END':
      return {
        ...state,
        isFetching: !state.isFetching,
      };
    case 'LOG_OUT':
      return {
        ...initialState,
      };
    case 'ADD_EXPENSE':
      const { id, date, expTypeId, amount } = action;
      return {
        ...state,
        expenses: [
          ...state.expenses,
          {
            id,
            date,
            expTypeId,
            amount,
          },
        ],
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses.filter(exp => exp.id !== action.id)],
      };
    case 'TOGGLE_MODAL':
      const { modalName } = action;
      return {
        ...state,
        modals: {
          ...state.modals,
          [modalName]: !state.modals[modalName],
        },
      };
    case 'ADD_EXPTYPE': {
      //declare a block so there's no two id constants in the switch scope
      const { id, name, color } = action;
      return {
        ...state,
        expTypes: [...state.expTypes, { id, name, color }],
      };
    }
    // Date range selection
    case 'SET_FROM':
      return {
        ...state,
        filters: {
          ...state.filters,
          from: action.from,
        },
      };
    case 'SET_TO':
      return {
        ...state,
        filters: {
          ...state.filters,
          to: action.to,
        },
      };
    default:
      return state;
  }
};
