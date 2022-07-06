import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import SignInWidget from './SignInWidget';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(
  class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        authenticated: null
      };
     ;
      this.checkAuthentication();
    }

    async checkAuthentication() {
      const authenticated = await this.props.oktaAuth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    onSuccess = res => {
      return this.props.isAuthenticated.Redirect({
        sessionToken: res.session.token
      });
    };

    onError = err => {
      console.log('error logging in', err);
    };

    render() {
      if (this.state.authenticated === null) return null;
      return this.state.authenticated ? (
        <Navigate to={{ pathname: 'src/App' }} />
      ) : (
        <SignInWidget
          baseUrl={this.props.baseUrl}
          onSuccess={this.onSuccess}
          onError={this.onError}
        />
      );
    }
  }
);