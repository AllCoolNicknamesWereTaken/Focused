
import React from 'react';
import './style.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';


const api_url = '/events.json';

  BigCalendar.momentLocalizer(moment)


export class Calendar extends React.Component {

  constructor() {
    super();
    this.state = {
      events: []
    };
  }

  componentWillMount() {
    var self = this;
    console.log("dupa");
    fetch(api_url)
    .then(function(dupa) {
      return dupa.json();
    })
    .then(function(data_z_jsonem) {
      if(data_z_jsonem.status !== "ok") {
        console.error("błąd danych");
        return;
      }

      self.setState({
        events: data_z_jsonem.data.map(function(event) {
          event.start = new Date(event.start);
          event.end = new Date(event.end);
          return event;
        })
      });
    });
  }

  render() {
    return (
        <div className="CalendarContainer">
          <BigCalendar
            events={this.state.events}
          />
        </div>

    );
  }
};
