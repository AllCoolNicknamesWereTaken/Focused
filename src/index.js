
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Helmet} from "react-helmet";
import {Belt} from './Belt';
import {Footer} from './Footer';
import {Head} from './Head';
import {Button} from './Button';
import {Form} from './Form';
import {RegForm} from './RegForm';
import {Menu} from './Menu';
import {Calendar} from './Calendar';
import {Wyloguj} from './Wyloguj';
import {Add} from './Add';
import {Delete} from './Delete';


function LoginPage() {
  return (
    <div>
      <Form />
      <Button text="zaloguj" class="button1" link="#main" />
      <Button text="Zarejestruj sie" class="button2" link="#registration" />
    </div>
  )
}

function Registration() {
  return (
    <div>
      <RegForm />
      <Button text="Zarejestruj sie" class="button2" link="#registration" />
    </div>
  )
}

function DeletePage() {
  return (
    <div>
      <Delete />
    </div>
  )
}

class Mainpage extends React.Component {



  render() {
    return (
      <div className="main-container">
        <Menu />
        <Calendar setDate={this.props.setDate} />
        <div className="right-side">
          <Button text="Wyloguj" class="wyloguj" link="#login" />
          <Button text="Dodaj wydarzenie" class="button1" link="#add" />
        </div>
      </div>
    )
  }
}



// function NoteBase() {
//   return (
//     // );
// }
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


    window.addEventListener('hashchange', this.onHashChange.bind(this));

  }
  setDate(start, end) {
    this.setState({
      start: start,
      end: end
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
          <Mainpage setDate={this.setDate} /> :
          this.state.active_page === 'registration'? <Registration /> :this.state.active_page === 'add'?
           <AddEvent start={this.state.start} end={this.state.end} /> : this.state.active_page === 'delete'?
           <DeletePage /> : <div>404 /n page not found</div>
        }
        </div>
        <Footer />
      </div>
    );
  }
}

//  const element = <Belt name="Sara" a="hej" b="czesc" />;
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
