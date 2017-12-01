import React from 'react';
import './style.css';

export function Add(props) {
  return (
    <div class="all">
      <div class='main-class'>
        <div class='des-class'>
          <div class="name">
            <input type="text" id="name" name="name" placeholder="Nazwa wydarzenia" />
          </div>
          <div class="time">
            <input type="text" id="name" name="name" placeholder="od" />
            <input type="text" id="name" name="name" placeholder="do" />
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
        </div>
      </div>
    </div>
    );
};
