import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(
  class Home extends Component {
    state = { authenticated: null };

    checkAuthentication = async () => {
      const authenticated = await this.props.oktaAuth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    };

    async componentDidMount() {
      this.checkAuthentication();
    }

    async componentDidUpdate() {
      this.checkAuthentication();
    }

    login = async () => {
      //this.props.auth.login('/');
      this.props.oktaAuth.signInWithRedirect('/');
    };

    logout = async () => {
      //this.props.oktaAuth.signOut('/');
      this.props.oktaAuth.signOut({ postLogoutRedirectUri: window.location.orign + '/goodbye' });
    };

    render() {
      if (this.state.authenticated === null) return null;

      const mainContent = this.state.authenticated ? (
        <div>
          <p className="lead">
            You have entered the staff portal,{' '}
            <Link to="componenets/pages/Staff">click here</Link>
          </p>
          <button className="btn btn-light btn-lg" onClick={this.logout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p className="lead">
            If you are a staff member, please get your credentials from your
            supervisor
          </p>
          <button className="btn btn-dark btn-lg" onClick={this.login}>
            Login
          </button>
        </div>
      );

      return (
        <div className="jumbotron">
          <h1 className="display-4">Acme Staff Portal</h1>
          {mainContent}
        </div>
      );
    }
  }
);