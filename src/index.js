/* global FB */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Belt} from './Belt';
import {Footer} from './Footer';
import {Head} from './Head';
import {Button} from './Button';
import {Form} from './Form';
import {RegForm} from './RegForm';
import {Menu} from './Menu';
import {Calendar} from './Calendar';
import {Add} from './Add';
import {Delete} from './Delete';
import {FbButton} from './FbButton';
import {FbPass} from './FbPass';
import {Photo} from './Photo';


function LoginPage() {
  return (
    <div>
      <Form />
      <FbButton link="#main" />


    </div>
  )
}

function Registration() {
  return (
    <div>
      <RegForm />
      <Button text="Zarejestruj sie" buttonClass="button2" link="#registration" />
    </div>
  )
}

function DeletePage(props) {
  return (
    <div>

      <Delete id={props.id} />
    </div>
  )
}

class Mainpage extends React.Component {
  render() {
    return (
      <div>

      <div className="main-container">

        <Menu />
        <Calendar setDate={this.props.setDate} setId={this.props.setId} />
        <div className="right-side">
          <Photo />
          <div onClick={FB.logout(function(response) {
  // user is now logged out
              })}>
          <Button text="Wyloguj" buttonClass="wyloguj" link="#login" />

          </div>
          <Button text="Dodaj wydarzenie" buttonClass="button1" link="#add" />
        </div>
      </div>
      </div>
    )
  }
}


function AddEvent(props) {
  return (
    <div>
      <Mainpage />
      <Add start={props.start} end={props.end} />
    </div>

  )
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active_page: 'login',
      start: new Date(),
      end: new Date(),
    };

    this.setDate = this.setDate.bind(this);
    this.setId = this.setId.bind(this);


    window.addEventListener('hashchange', this.onHashChange.bind(this));

  }
  setDate(start, end) {
    this.setState({
      start: start,
      end: end
    })
  }

  setId(id) {
    this.setState({
      id: id
    })
  }


  componentDidMount() {
      this.onHashChange();
  }

  onHashChange() {
    const state = this.state;
    state.active_page = window.location.hash ? window.location.hash.toString().slice(1) : this.state.active_page;
    this.setState(state);
  }

  render() {
    return (
      <div>
        <Head title={"Focused " + this.state.active_page} />
        <Belt />
        <div className="AllMainContainer">
        {
          this.state.active_page === 'login' ?
          <LoginPage /> : this.state.active_page === 'main' ?
          <Mainpage setDate={this.setDate} setId={this.setId} /> :
          this.state.active_page === 'registration'? <Registration /> :this.state.active_page === 'add'?
           <AddEvent start={this.state.start} end={this.state.end} /> : this.state.active_page === 'delete'?
           <DeletePage id={this.state.id} /> : <div>404 /n page not found</div>
        }
        </div>
        <Footer />
      </div>
    );
  }
}

window.fbAsyncInit = function() {
  window.FB.init({
    appId      : '776635205873005',
    xfbml      : true,
    version    : 'v2.11'
  });
  window.FB.AppEvents.logPageView();

  window.FB.login((resp) => {
    window.location.hash = "#main";

    console.log('MOJ ACCESS TOKEN', resp);
    window.fb_data = resp;

    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
  });


};
