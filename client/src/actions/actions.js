import axios from 'axios';

export const fetchAll = () => async dispatch => {
  dispatch({
    type: 'FETCH_START',
  });
  // Make to requests, then wait for both to resolve
  const expTypesRes = axios.get('/api/expTypes');
  const expensesRes = axios.get('/api/expenses');

  const { data: expTypes } = await expTypesRes;
  const { data: expenses } = await expensesRes;
  dispatch({
    type: 'FETCH_ALL',
    expTypes,
    expenses,
  });
  dispatch({
    type: 'FETCH_END',
  });
};

export const addExpense = (amount, expTypeId) => async dispatch => {
  const expense = {
    amount,
    expTypeId,
    date: new Date(),
  };
  try {
    const { data } = await axios.post('/api/expenses', expense);
    dispatch({
      type: 'ADD_EXPENSE',
      id: data.id,
      date: new Date(data.date),
      amount: data.amount,
      expTypeId: data.expTypeId,
    });
  } catch (err) {
    dispatch({
      type: 'GET_ERRORS',
      errors: err.response.data,
    });
  }
};

export const deleteExpense = id => async dispatch => {
  try {
    const { data } = await axios.delete(`/api/expenses/${id}`);
    dispatch({
      type: 'DELETE_EXPENSE',
      id: data.id,
    });
  } catch (err) {
    dispatch({
      type: 'GET_ERRORS',
      errors: err.response.data,
    });
  }
};

export const addExpType = (name, color) => async dispatch => {
  const expType = {
    name,
    color,
  };
  try {
    const { data } = await axios.post('/api/expTypes', expType);
    dispatch({
      type: 'ADD_EXPTYPE',
      id: data.id,
      name: data.name,
      color: data.color,
    });
  } catch (err) {
    dispatch({
      type: 'GET_ERRORS',
      errors: err.response.data,
    });
  }
};

export const setFrom = from => ({
  type: 'SET_FROM',
  from,
});

export const setTo = to => ({
  type: 'SET_TO',
  to,
});

export const toggleModal = modalName => ({
  type: 'TOGGLE_MODAL',
  modalName,
});
