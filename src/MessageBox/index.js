import React from 'react';
import './style.css';

export class MessageBox extends React.Component {
  render() {
    return (
      <div class="all" >

        <div class='main-class'>
          <div class='des-class'>
          {this.props.children}

          </div>
          </div>
      </div>
    );
  }
};
