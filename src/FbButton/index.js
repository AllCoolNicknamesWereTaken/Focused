import React from 'react';
import './style.css';

export class FbButton extends React.Component {
  loginAction() {
    window.FB.login((resp) => {
      window.location.hash = "#main";

      console.log('MOJ ACCESS TOKEN', resp);
      window.fb_data = resp;
    });
  }

  render() {
    return (
      <button className="loginBtn loginBtn--facebook" onClick={() => {
        this.loginAction();
      }}>
        Zaloguj przez Facebook
      </button>
    );
  }
};
