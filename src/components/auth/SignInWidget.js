import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

//import '@okta/okta-signin-widget/dist/css/okta-theme.css';
//use in index html
class SignInWidget extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    
    this.widget = new OktaSignIn({
        issuer: 'https://dev-74644713.okta.com/oauth2/default',
        clientId: '{0oa5dpmw83pzjs3e05d7}',
        redirectUri: window.location.origin + '/login/callback'
        //baseUrl: this.props.baseUrl     
    });
    this.widget.renderEl({ el }, this.props.onSuccess, this.props.onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return <div />;
  }
};

export default SignInWidget;