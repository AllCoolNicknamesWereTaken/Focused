import React from 'react';
import './style.css';

export function FbButton(props) {
  var apiAddress = window.location.protocol + '//' + window.location.hostname + ':8080/authfacebook';
  return (
    <a href={apiAddress}>
    <button class="loginBtn loginBtn--facebook" >
      Zaloguj przez Facebook
    </button>
    </a>
  );
};
