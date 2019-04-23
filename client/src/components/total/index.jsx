import React from 'react';
import styled from 'styled-components';
import mPaper from '@material-ui/core/Paper';

import DateInput from './dateInput';
import Donut from './donut';

const Paper = styled(mPaper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width:100%;
  min-height: 23rem;

  @media screen and (min-width: 480px) {
    min-width: 40%;
  }
`;

const Total = () => {
  return (
    <Paper>
      <h2>Total:</h2>
      <DateInput />
      <Donut />
    </Paper>
  );
};

export default Total;
