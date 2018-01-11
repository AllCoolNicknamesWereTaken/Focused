import React from 'react';
import './style.css';

export function FbButton(props) {
  var apiAddress = window.location.
  return (
    <a href={window.location.protocol + '//' + window.location.hostname + ':8080/authfacebook'}>
    <button class="loginBtn loginBtn--facebook" >
      Zaloguj przez Facebook
    </button>
    </a>
  );
};
