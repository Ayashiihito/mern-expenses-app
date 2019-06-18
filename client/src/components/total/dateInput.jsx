import React from 'react';
import { connect } from 'react-redux';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { DatePicker } from 'material-ui-pickers';

import { setFrom, setTo } from '../../redux/actions/expenses';

const mapStateToProps = state => ({
  from: state.expensesApp.filters.from,
  to: state.expensesApp.filters.to,
});

const dateInput = ({ from, to, setFrom, setTo }) => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker value={from} onChange={from => setFrom(from._d)} />
      <DatePicker value={to} onChange={to => setTo(to._d)} />
    </MuiPickersUtilsProvider>
  );
};

export default connect(
  mapStateToProps,
  { setFrom, setTo }
)(dateInput);
