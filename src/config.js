export default {
    oidc: {
      issuer: 'https://dev-74644713.okta.com/oauth2/default',
      clientId: '${0oa5dpmw83pzjs3e05d7}',
      scopes: ['openid', 'profile', 'email'],
      redirectUri: `${window.location.origin}/login/callback`
    },
    widget: {
      issuer: 'https://dev-74644713.okta.com/oauth2/default',
      clientId: '${0oa5dpmw83pzjs3e05d7}',
      redirectUri: `${window.location.origin}/login/callback`,
      scopes: ['openid', 'profile', 'email'],
      useInteractionCodeFlow: true
    }
  };

  