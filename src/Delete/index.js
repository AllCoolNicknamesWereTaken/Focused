import React from 'react';
import './style.css';
import {MessageBox} from '../MessageBox';
import {Button} from '../Button';

export class Delete extends React.Component {
  constructor(props) {
    super(props);
    console.log('a', props);
    this.state = {


    };

    this.remove = this.remove.bind(this);
  }
  render() {
    return (
      <MessageBox>
      <div className="container">
        <div className="label">
          Czy chcesz usunąć wydarzenie o numerze {this.props.id}?
          </div>
          <div className="buttoncontainer">

          <Button link="#main" buttonClass ="button1" text=" USUŃ" click={this.remove} />

          <Button link="#main" buttonClass ="button1" text="ANULUJ" />
        </div>
      </div>
      </MessageBox>
    );
  }

  remove = function () {
    fetch(window.location.protocol + '//' + window.location.hostname + ':8080/deleteevents', { method: 'DELETE', body: JSON.stringify({
      id:  this.props.id,
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
