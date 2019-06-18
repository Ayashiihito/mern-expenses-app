import React from 'react';
import { connect } from 'react-redux';
import mPaper from '@material-ui/core/Paper';
import styled from 'styled-components/macro';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getExpenses } from '../../redux/actions/selectors';
import { groupByDate } from '../../redux/actions/selectors';
import { deleteExpense } from '../../redux/actions/expenses';
import HistoryElement from './historyElement';

const Paper = styled(mPaper)`
  margin: 0.3rem 0;
  padding: 1rem;
  width: 100%;
`;

const mapStateToProps = state => ({
  expenses: groupByDate(getExpenses(state)),
  expTypes: state.expensesApp.expTypes,
  isFetching: state.expensesApp.isFetching,
});

//TODO: refactor chained ternary operators
const ExpensesHistory = ({ expenses, expTypes, deleteExpense, isFetching }) => {
  return isFetching ? (
    <CircularProgress
      css={`
        margin: 3rem;
        color: ${props => props.theme.primary};
      `}
    />
  ) : Object.keys(expenses)[0] ? (
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
