import React from 'react';
import './style.css';

export function Button(props) {
  return (
    <div>
        <a href = {props.link} className='a'>
        <div className = {props.class} >

        {props.text}
      </div>
      </a>
    </div>
  );
};
