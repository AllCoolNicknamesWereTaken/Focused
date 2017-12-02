import React from 'react';
import './style.css';

export function Add(props) {
  return (

    <div class="all" >

      <div class='main-class'>
        <div class='des-class'>
          <div class="name">
            <input type="text" id="name" name="name" placeholder="Nazwa wydarzenia" />
          </div>

          <div class="time">
            <input type="time" id="name" name="name" placeholder="Godzina rozpoczęcia" />
            -
            <input type="time" id="name" name="name" placeholder="godzina zakończenia" />
          </div>
          <div class="time">
            <input type="date" id="name" name="name" placeholder="od" />
            -
            <input type="date" id="name" name="name" placeholder="do" />
          </div>
          <div class="comment">
            <textarea rows="10" cols="50" id="content" name="content"
            ></textarea>
          </div>
          <div class="importance">
            <div class="stars">
            </div>
            <div class="stars">
            </div>
            <div class="stars">
            </div>
            <div class="stars">
            </div>
            <div class="stars">
            </div>
          </div>
          <div className = 'button1'>
            <a href = "#main" className='a'>
              <div>
                OK
                </div>
              </a>
          </div>
        </div>
        </div>
    </div>

    );
};
