import React from 'react';
import './style.css';
import {MessageBox} from '../MessageBox';
import {Button} from '../Button';

export class Delete extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {


    };

    this.remove = this.remove.bind(this);
  }
  render() {
    return (
      <MessageBox>
      <div className="container">
        <div className="label">
          Czy chcesz usunąć to wydarzenie?
          </div>
          <div className="buttoncontainer">

          <Button link="#main" class ="button1" text=" USUŃ" click={this.remove} />

          <Button link="#main" class ="button1" text="ANULUJ" />
        </div>
      </div>
      </MessageBox>
    );
  }

  remove = function () {
    fetch('http://localhost:8080/deleteevents', { method: 'DELETE', body: JSON.stringify({
      id:  1
    })
    })
    .then(function() {
      window.location.hash = '#main';
    });

}
};


//
// send = function () {
//   fetch('http://localhost:8080/addevents', { method: 'POST', body: JSON.stringify({
//     title:  this.state.eventName,
//     start:  this.state.startDate,
//     end:    this.state.endDate
//   }) })
//   .then(function() {
//     window.location.hash = '#main';
//   });
//
// }
