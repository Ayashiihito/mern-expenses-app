import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import ExpensesInputs from './expensesInputs';
import ExpensesHistory from './expensesHistory';
import Total from './total';
import { fetchAll } from '../redux/actions/actions.js';

const Main = styled.main`
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
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Landing = ({ fetchAll }) => {
  useEffect(() => {
    fetchAll();
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
  null,
  { fetchAll }
)(Landing);
