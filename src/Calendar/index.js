
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
        <div className="CalendarContainer">
          <BigCalendar
            events={[]}
            startAccessor='startDate'
            endAccessor='endDate'
          />
        </div>

    );
  }
};
