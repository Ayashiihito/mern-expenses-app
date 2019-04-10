import axios from 'axios';

export const fetchExpTypes = () => async dispatch => {
  try {
    const { data: expTypes } = await axios.get('/api/expTypes');
    dispatch({
      type: 'FETCH_EXPTYPES',
      expTypes,
    });
  } catch (err) {
    console.log(err);
  }
};
export const fetchExpenses = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/expenses');
    const expenses = data.map(expense => {
      expense.date = new Date(expense.date);
      return expense;
    });
    dispatch({
      type: 'FETCH_EXPENSES',
      expenses,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addExpense = (amount, expTypeId) => async dispatch => {
  const expense = {
    amount: parseInt(amount),
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
