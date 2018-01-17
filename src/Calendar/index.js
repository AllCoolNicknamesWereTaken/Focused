/* global FB */
import React from 'react';
import './style.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

console.log('KURWAAAA', window.FB);

const api_url = window.location.protocol + '//' + window.location.hostname + ':8080/events';

  BigCalendar.momentLocalizer(moment)

export class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      avatar: `http://graph.facebook.com/${window.fb_data.authResponse.userID}/picture`
    };
    this.addEvent = this.addEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  componentWillMount() {
    FB.api(
    "/" + window.fb_data.authResponse.userID + "/events",
    "GET",
    {},
    function (response) {
      console.log(response);
      if (response && !response.error) {
        console.log('probaeventow' + JSON.stringify(response));
      }
    }
);

    var self = this;
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
    this.props.setDate(slotInfo.start, slotInfo.end); //czyje propsy
  }
  deleteEvent(slotInfo) {
    window.location.hash = "#delete";
    this.props.setId(slotInfo.idevents);
    console.log(slotInfo.idevents);
  }


  render() {
    return (
        <div className="CalendarContainer">
        <img src={this.state.avatar} />
          <BigCalendar
            events={this.state.events}
            selectable={true}
            onSelectSlot={this.addEvent}
            onSelectEvent={this.deleteEvent}
          />
        </div>

    );
  }
};
