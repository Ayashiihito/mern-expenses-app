import React, { Suspense } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Suspended = Component => props => (
  <Suspense fallback={<CircularProgress />}>
    <Component {...props} />
  </Suspense>
);

export default Suspended