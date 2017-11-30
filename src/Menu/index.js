import React from 'react';
import './style.css';

export function Menu() {
  return (

<div className="side-menu">
  <nav >
    <ol>
        <li class="Kalendarz">
          <a href="index.html">Kalendarz</a>
        </li>
        <li class="Base">
          <a href="szkolenia.html">Moje bazy danych</a>
            <ul class="RozwijalnePar">
              <li class="Rozwijalne">
                <a class="White">Notatki_1</a>
              </li>
              <li class="Rozwijalne">
                <a class="White">Notatki_2</a>
              </li>
            </ul>
        </li>
        <li class="Szukaj">
              <a href="konferencje.html">Szukaj</a>
              <ul class="RozwijalnePar">
                <li class="Rozwijalne">
                  <a class="White">Notatki_1</a>
                </li>
              </ul>
            </li>
          </ol>
        </nav>
      </div>


  );
};
