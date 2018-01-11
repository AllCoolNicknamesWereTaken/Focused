import React from 'react';
import './style.css';

export function FbButton(props) {
  return (
    <a href="http://localhost:8080/authfacebook">
    <button class="loginBtn loginBtn--facebook" >
      Zaloguj przez Facebook
    </button>
    </a>
  );
};
