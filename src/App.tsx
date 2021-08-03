import React from 'react';
import './App.css';
import Users from 'features/users/Users';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserDetails from 'features/userDetails/UserDetails';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path="/" exact component={Users} />
          <Route path="/users" exact component={Users} />
          <Route path="/user/:id" exact component={UserDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
