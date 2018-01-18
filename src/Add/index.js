import React from 'react';
import './style.css';
import {Button} from '../Button';


export class Add extends React.Component {
      constructor(props) {
        super(props);
        console.log(props);
        this.state = {
          eventName: '',
          startTime: '',
          endTime: '',
          startDate: props.start,
          endDate: props.end,
          comment: ''

        };

        this.send = this.send.bind(this);
        this.updatecomment = this.send.bind(this);
        this.updatestartDate =this.updatestartDate.bind(this);
        this.updateendDate =this.updateendDate.bind(this);
        this.updatestartTime =this.updatestartTime.bind(this);
        this.updateeventName =this.updateeventName.bind(this);
        this.updateendTime =this.updateendTime.bind(this);
      }

      send = function () {
        fetch(window.location.protocol + '//' + window.location.hostname + ':8080/addevents', { method: 'POST', body: JSON.stringify({
          title:  this.state.eventName,
          start:  this.state.startDate,
          end:    this.state.endDate,
					user: window.fb_data.authResponse.userID
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
        console.log('e?', this.state.endDate)
      }
      updatestartTime = function(evt) {
        console.log(evt.target.value);
        this.setState({
          startTime: evt.target.value
        });
        console.log('2 ', this.state.startTime);
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
          console.log('end ', this.state.endTime);
        }

    render = function() {
    return (

    <div className="all" >

      <div className='main-className'>
        <div className='des-class'>
          <div className="nam">
            <input type="text" id="name" name="name" placeholder="Nazwa wydarzenia"
            value={this.state.eventName} onChange={evt => this.updateeventName(evt)} />
          </div>

          <div className="time">
            <input type="time" id="eventStartTime" name="name" placeholder="Godzina rozpoczęcia"
            value={this.state.startTime} onChange={this.updatestartTime} />
            -
            <input type="time" id="eventEndTime" name="name" placeholder="godzina zakończenia"
            value={this.state.endTime} onChange={this.updateendTime} />
          </div>
          <div className="time">
            <input type="date" id="eventStartDate" name="name" placeholder="od"
             value={this.state.startDate} onChange={this.updatestartDate} />
            -
            <input type="date" id="eventEndDate" name="name" placeholder="do"
            value={this.state.endDate} onChange={this.updateendDate} />
          </div>

          <div className="comment">
            <textarea rows="10" cols="50" id="content" name="content"
            value={this.state.comment} onChange={this.updatecomment} ></textarea>
          </div>
          <div className="importance">
            <div className="stars">
            </div>
            <div className="stars">
            </div>
            <div className="stars">
            </div>
            <div className="stars">
            </div>
            <div className="stars">
            </div>
            <div className="buttoncontainer">
            <div className = 'button1' onClick={this.send}>
                <div>
                OK
                </div>
              </div>
              <Button buttonClass="wyloguj" link="#main" text="ANULUJ" />

          </div>
          </div>
        </div>
      </div>
    </div>
        );
  }
};
