import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './Pages/Join';
import Play from './Pages/Play';

const App = () => {
  return (
    <Router>
      <Route path='/' exact component={Join} />
      <Route path='/play' component={Play} />
    </Router>
  )
}

export default App;