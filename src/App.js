import React, { Fragment } from 'react';

import AppRouter from './AppRouter';
import { AppHeader } from './components';

const App = () => {
  return (
    <Fragment>
      <AppHeader />
      <AppRouter />
    </Fragment>
  );
}

export default App;
