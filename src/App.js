import React from 'react';
import './App.css'
import {BrowserRouter as Router,Route} from "react-router-dom";
import Token from "./components/TokenComponent/Token.component"
import Track from "./components/Tracker.component"
import Pastride from './components/Pastride';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home'
import HomepageComponent from './components/HomePageComponent/HomePageComponent'

function App() {
  return (
    <div className="App">
      <Router>
      <Route path='/token' component={Token} />
      <Route path='/track' component={Track} />
      <Route path='/' component={Home} />
      <Route path='pastride' component={Pastride} />
      <Route path='/login' component={Login} />
      <Route path='/profile' component={Profile} />
      </Router>
    </div>
  );
}

export default App;
