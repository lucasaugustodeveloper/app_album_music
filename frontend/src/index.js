import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './App';
import Album from './components/Album'

const Routes = () => (
  <Router>
    <div className="section container">
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route exact path="/albums/:id" component={Album}></Route>
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(<Routes />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
