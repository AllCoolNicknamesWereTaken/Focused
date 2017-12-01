import React from 'react';
import './style.css';

export function Menu() {
  return (

<div className="side-menu">
  <nav >
    <ol>
        <li className="Kalendarz">
          <a href="index.html">Kalendarz</a>
        </li>
        <li class="Base">
          <a href="szkolenia.html">Moje bazy danych</a>
            <ul className="RozwijalnePar">
              <li className="Rozwijalne">
                <a className="White">Notatki_1</a>
              </li>
              <li className="Rozwijalne">
                <a className="White">Notatki_2</a>
              </li>
            </ul>
        </li>
        <li className="Szukaj">
              <a href="konferencje.html">Szukaj</a>
              <ul className="RozwijalnePar">
                <li className="Rozwijalne">
                  <a className="White">Notatki_1</a>
                </li>
              </ul>
            </li>
          </ol>
        </nav>
      </div>


  );
};
