import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FrontPage from './components/Frontpage.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/home" component={FrontPage}/>
    </Router>
  )
}

export default App;