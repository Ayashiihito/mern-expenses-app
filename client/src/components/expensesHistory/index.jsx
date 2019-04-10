import React from 'react';
import { connect } from 'react-redux';
import mPaper from '@material-ui/core/Paper';
import styled from 'styled-components';

import { getExpenses } from '../../actions/selectors';
import { groupByDate } from '../../actions/selectors';
import { deleteExpense } from '../../actions/actions';
import HistoryElement from './historyElement';

const Paper = styled(mPaper)`
  margin: 0.3rem 0;
  padding: 1rem;
  width: 95%;
`;

const mapStateToProps = state => ({
  expenses: groupByDate(getExpenses(state)),
  expTypes: state.expensesApp.expTypes,
});

const ExpensesHistory = ({ expenses, expTypes, deleteExpense }) => {
  return Object.keys(expenses)[0] ? (
    Object.keys(expenses).map(date => (
      <Paper key={date}>
        <span>{date}</span>
        {expenses[date].map(expense => (
          <HistoryElement
            key={expense.id}
            expense={expense}
            expTypes={expTypes}
            onDelete={deleteExpense}
          />
        ))}
      </Paper>
    ))
  ) : (
    <Paper>
      <p>Nothing has been entered yet</p>
    </Paper>
  );
};
export default connect(
  mapStateToProps,
  { deleteExpense }
)(ExpensesHistory);
