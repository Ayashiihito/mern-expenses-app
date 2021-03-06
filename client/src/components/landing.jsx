import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import ExpensesInputs from './expensesInputs';
import ExpensesHistory from './expensesHistory';
import Total from './total';
import { fetchAll, onFirstLoad } from '../redux/actions/expenses.js';

const Main = styled.main`
  margin: 0.6rem;
  display: flex;
  flex-direction: column;
  width: auto;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 480px) {
    flex-direction: row-reverse;
    padding: 2rem 5rem;
    align-items: flex-start;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
  width: 100%;
  @media screen and (min-width: 480px) {
    width: 60%;
  }
`;
const mapStateToProps = state => ({
  isFirstLoad: state.expensesApp.isFirstLoad,
});

const Landing = ({ fetchAll, isFirstLoad, onFirstLoad }) => {
  useEffect(() => {
    if (isFirstLoad) {
      onFirstLoad();
      fetchAll();
    }
  });
  return (
    <Main>
      <Total />
      <Container>
        <ExpensesInputs />
        <ExpensesHistory />
      </Container>
    </Main>
  );
};

export default connect(
  mapStateToProps,
  { fetchAll, onFirstLoad }
)(Landing);
