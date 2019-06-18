import React from 'react';
import API from '../API';

export default function container(Component) {
  class AuthContainer extends React.Component {
    state = {
      loggedIn: !!localStorage.getItem('token'),
    }

    logout = () => {
      localStorage.removeItem('token');
      this.setState({ loggedIn: false });
    }


    verifySlackCode = async (code) => {
      const { token, loggedIn } = await API.post('/auth/slack', { code, url: process.env.REACT_APP_CALLBACK_URL });
      localStorage.setItem('token', token);
      this.setState({ loggedIn });
    }

    redirectToSlack = () => {
      let SLACK_URL = 'https://slack.com/oauth/authorize?';
      SLACK_URL += `client_id=${process.env.REACT_APP_CLIENT_ID}`;
      SLACK_URL += '&scope=identity.basic,identity.email';
      SLACK_URL += `&redirect_uri=${process.env.REACT_APP_CALLBACK_URL}`;
      window.location = SLACK_URL;
    }

    render() {
      const { loggedIn } = this.state;
      return (
        <Component
          /* pass all other props that are being passed to this component forward */
          {...this.props}
          loggedIn={loggedIn}
          logout={this.logout}
          redirectToSlack={this.redirectToSlack}
          verifySlackCode={this.verifySlackCode}
        />
      );
    }
  }
  return AuthContainer;
}
