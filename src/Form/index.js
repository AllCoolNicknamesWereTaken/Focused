import React from 'react';
import './style.css';

export function Form() {
  return (
    <div className='helper'>
      <form>
        <input type="email" id="user-email" name="user-email" placeholder="Email" />
        <br />
        <br />
        <input type="password" name="psw" id="password" placeholder="Hasło" />
      </form>
    </div>
  );
};
