const initialState = {
  isFetching: false,
  expenses: [],
  expTypes: [],
  modals: {
    addType: false, // doesn't work without predefining modal's state?
  },
  filters: {
    from: new Date('1/1/19'), //maybe it shouldn't be here
    to: new Date(),
    order: 'NEW_FIRST',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return {
        ...state,
        expenses: [
          ...action.expenses.map(expense => {
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
        ...state,
        expenses: [],
        expTypes: [],
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
      //declare a block so there's no two id constants in the scope
      const { id, name, color } = action;
      return {
        ...state,
        expTypes: [...state.expTypes, { id, name, color }],
      };
    }
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
