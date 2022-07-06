//import "./styles.css";
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Security,LoginCallback } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
//import { SecureRoute } from '@okta/okta-react';

import  Navbar  from "./components/layout/Navbar";
import  Home  from "./components/pages/Home";
import  Staff  from "./components/pages/Staff";
import  Login  from "./components/auth/Login";
import Profile from './components/pages/Profile';
import './App.css';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-74644713.okta.com/oauth2/default',
  clientId: '{0oa5dpmw83pzjs3e05d7}',
  redirectUri: window.location.origin + '/login/callback'
});

function onAuthRequired({ history }) {
  history.push('/login');
}

class App extends Component {

  constructor(props) {
    super(props);
    this.restoreOriginalUri = async (_oktaAuth, originalUri) => {
      props.history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    };
}
  render() {
    return (
      <Router>
        <Security oktaAuth={oktaAuth} 
        restoreOriginalUri={this.restoreOriginalUri}
        onAuthRequired={onAuthRequired}> 
          <div className="App">




            
            <Navbar />
            <div className="container">
            <Routes>
              <Route path="components/pages/Home" element={<Home />} exact />  
              <Route path='components/pages/Staff' element={<Staff />} exact/>
        
              <Route path="components/pages/profile" element={<Profile />} exact/>
              <Route path="components/auth/Login" element={<Login />} exact/>
              
              <Route path="components/auth/Login"
                render={() => (
                  <Login baseUrl="https://dev-74644713.okta.com" />)}
              />
              <Route path="/login/callback" component={LoginCallback} />
              </Routes>     
          </div>
          </div>
          </Security>
      </Router>
    );
  }
}

export default App;
