import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Levels from './views/levels';
import Bears from './views/bears';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Levels />
          </Route>
          <Route path="/bears">
            <Bears />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
