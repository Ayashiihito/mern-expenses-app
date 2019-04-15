import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';
import { Doughnut } from 'react-chartjs-2';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getExpenses } from '../../actions/selectors';

const Placeholder = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const mapStateToProps = state => {
  return {
    expenses: getExpenses(state),
    types: state.expensesApp.expTypes,
    isFetching: state.expensesApp.isFetching,
  };
};

const Donut = ({ expenses, types, isFetching }) => {
  const sumExpensesByType = expenses =>
    types.map(type =>
      expenses.reduce(
        (acс, current) =>
          current.expTypeId === type.id ? acс + current.amount : acс,
        0
      )
    );

  const DATA = {
    datasets: [
      {
        data: sumExpensesByType(expenses),
        backgroundColor: types.map(type => type.color),
      },
    ],
    labels: types.map(type => type.name),
  };

  const options = {
    cutoutPercentage: 70,
  };

  return isFetching ? (
    <CircularProgress
      css={`
        margin-top: 3rem;
        color: ${props => props.theme.primary};
      `}
    />
  ) : expenses[0] ? (
    <Doughnut data={DATA} options={options} />
  ) : (
    <Placeholder>
      <h3>Add Something</h3>
    </Placeholder>
  );
};

export default connect(mapStateToProps)(Donut);
