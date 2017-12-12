import React from 'react';
import './style.css';
import {MessageBox} from '../MessageBox';
import {Button} from '../Button';

export class Delete extends React.Component {
  render() {
    return (
      <MessageBox>
      <div className="container">
        <div className="label">
          Czy chcesz usunąć to wydarzenie?
          </div>
          <div className="buttoncontainer">
          <Button link="#main" class ="button1" text=" USUŃ" />
          <Button link="#main" class ="button1" text="ANULUJ" />
        </div>
      </div>
      </MessageBox>
    );
  }
};
