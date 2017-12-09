import React from 'react';
import './style.css';

import moment from 'moment';

export class Add extends React.Component {
      constructor(props) {
        super(props);
        console.log(props);
        this.state = {
          startTime: '',
          endTime: '',
          startDate: props.start,
          endDate: props.end,
          comment: ' '

        };

        this.send = this.send.bind(this);
      }

    render = function() {
    return (

    <div class="all" >

      <div class='main-class'>
        <div class='des-class'>
          <div class="name">
            <input type="text" id="name" name="name" placeholder="Nazwa wydarzenia"
            value={this.state.eventName} onChange={evt => this.updateeventName(evt)} />
          </div>

          <div class="time">
            <input type="time" id="eventStartTime" name="name" placeholder="Godzina rozpoczęcia"
            value={this.state.startTime} onChange={evt => this.updatestartTime(evt)} />
            -
            <input type="time" id="eventEndTime" name="name" placeholder="godzina zakończenia"
            value={this.state.endTime} onChange={evt => this.updateendTime(evt)} />
          </div>
          <div class="time">
            <input type="date" id="eventStartDate" name="name" placeholder="od"
             value={moment(this.state.startDate).format('YYYY-MM-DD')} onChange={evt => this.updatestartDate(evt)} />
            -
            <input type="date" id="eventEndDate" name="name" placeholder="do"
            value={moment(this.state.endDate).format('YYYY-MM-DD')} onChange={evt => this.updateendDate(evt)} />
          </div>

          <div class="comment">
            <textarea rows="10" cols="50" id="content" name="content"
            value={this.state.comment} onChange={evt => this.updatecomment(evt)} ></textarea>
          </div>
          <div class="importance">
            <div class="stars">
            </div>
            <div class="stars">
            </div>
            <div class="stars">
            </div>
            <div class="stars">
            </div>
            <div class="stars">
            </div>
          </div>
          <div className = 'button1' onClick={this.send}>
              <div>
                OK
              </div>
          </div>
        </div>
        </div>
    </div>
        );
  }
  send = function () {
    fetch('http://localhost:8080/addevents', { method: 'POST', body: JSON.stringify({
      title:  this.state.eventName,
      start:  this.state.startDate,
      end:    this.state.endDate
    }) })
    .then(function() {
      window.location.hash = '#main';
    });

  }

  updatestartDate = function(evt) {
    this.setState({
      startDate: evt.target.value
    });
  }
  updateendDate = function(evt) {
    this.setState({
      endDate: evt.target.value
    });
  }
  updatestartTime = function(evt) {
    this.setState({
      startTime: evt.target.value
    });
  }
  updatecomment = function(evt) {
    this.setState({
      comment: evt.target.value
    });
  }
  updateeventName = function(evt) {
    this.setState({
      eventName: evt.target.value
    });
  }
  updateendTime = function(evt) {
      this.setState({
        endTime: evt.target.value
      });
    }


};
