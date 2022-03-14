import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './components/Header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


const Routing = (
  <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={App} />
      </Switch>
  </Router> 
);
ReactDOM.render(Routing, document.getElementById('root'));
