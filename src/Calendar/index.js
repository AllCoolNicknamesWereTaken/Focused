
import React from 'react';
import './style.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';


const api_url = 'http://localhost:8080/events';

  BigCalendar.momentLocalizer(moment)


export class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    this.addEvent = this.addEvent.bind(this);
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
  addEvent(slotInfo) {
    window.location.hash = "#add";
    this.props.setDate(slotInfo.start, slotInfo.end);
  }
  // addEvent(slotInfo) {
  //   window.location.hash = "#add";
  //   this.props.setDate(slotInfo.start, slotInfo.end);
  // }

  render() {
    return (
        <div className="CalendarContainer">
          <BigCalendar
            events={this.state.events}
            selectable={true}
            onSelectSlot= {this.addEvent}
            onSelectEvent={this.eventOnClicked}
          />
        </div>

    );
  }
};
