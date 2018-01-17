/* global FB */
import React from 'react';
import './style.css';

export class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      avatar: `http://graph.facebook.com/${window.fb_data.authResponse.userID}/picture`,
      name: ''
    };
    console.log(this.state.name);
  }

  componentWillMount() {
    FB.api(
    "/me",
    "GET",
    {},
    (response) => {
      if (response && !response.error) {
        this.setState({
          name: response.name
        });
      }
    });
  }
  render() {
    return (
      <div className="RowContener">
        <img width="50" height="50" src={this.state.avatar} className="photo" />
        <p className="name">{this.state.name}</p>
      </div>
    );
  }

};
