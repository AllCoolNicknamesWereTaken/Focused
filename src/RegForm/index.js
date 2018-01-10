import React from 'react';

export function RegForm(props) {
  return (
    <div className='helper'>
      <form>
        <input type="text" id="user-name" name="text" placeholder="Nazwa użytkownika" />
        <br />
        <br />
        <input type="email" id="user-email" name="user-email" placeholder="Email" />
        <br />
        <br />
        <input type="password" name="psw" id="password" placeholder="Hasło" />
        <br />
        <input type="password" name="psw" id="password" placeholder="Powtórz hasło" />
      </form>
    </div>
  );
};
