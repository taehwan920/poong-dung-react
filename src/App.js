import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import StatisticsHome from './pages/StatisticsHome';

export default () => (
  <Router>
    <Route exact path='/' component={Home} />
    <Route exact path='/statistics' component={StatisticsHome} />
  </Router>
)