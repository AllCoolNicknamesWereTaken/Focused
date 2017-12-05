import React from 'react';
import './style.css';

export function Button(props) {
  return (
    <div className = {props.class} onClick = {props.click}>
      <a href = {props.link} className='a'>
        <div>
          {props.text}
        </div>
      </a>
    </div>
  );
};
