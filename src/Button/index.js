import React from 'react';
import './style.css';

export function Button(props) {
  return (
    <div>
      <div className = {props.class}>
        {props.text}
      </div>
    </div>
  );
};
