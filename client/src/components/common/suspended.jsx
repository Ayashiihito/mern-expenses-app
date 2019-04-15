import React, { Suspense } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components/macro';

const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Suspended = Component => props => (
  <Suspense
    fallback={
      <SpinnerContainer>
        <CircularProgress
          css={`
            color: ${props => props.theme.primary};
          `}
        />
      </SpinnerContainer>
    }
  >
    <Component {...props} />
  </Suspense>
);

export default Suspended;
