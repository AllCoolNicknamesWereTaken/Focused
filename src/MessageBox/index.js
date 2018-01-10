import React from 'react';
import './style.css';

export class MessageBox extends React.Component {
  render() {
    return (
      <div className="all" >

        <div classNameName='main-class'>
          <div className='des-class'>
          {this.props.children}

          </div>
          </div>
      </div>
    );
  }
};
