import React from 'react';
import './style.css';

const api_url = '/events.json';

export class Calendar extends React.Component {

  constructor() {
    super();
    this.state = {
      events: []
    };
  }

  componentWillMount() {
    var self = this;
    fetch(api_url)
    .then(function(dupa) {
      return dupa.json();
    })
    .then(function(data_z_jsonem) {
      if(data_z_jsonem.status !== "ok"){
        console.error("błąd danych");
        return;
      }
      self.setState({
        events: data_z_jsonem.data
      });
    });
  }

  render() {
    return (
      <div className="calendar">
           Kalendarz:
           {this.state.events.map(function(event){
             return <div>{event.name}, {event.id}</div>
           })}
      </div>
    );
  }
};
