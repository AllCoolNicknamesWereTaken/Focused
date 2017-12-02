
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

// BigCalendar.setLocalizer(

// );

function Mainpage() {
  return (
    <div className="main-container">
      <Menu />
      <Calendar />
      <div className="right-side">
        <Button text="Wyloguj" class="wyloguj" link="#add" />
      </div>
    </div>
  )
}



// function NoteBase() {
//   return (
//     // );
// }
function AddEvent() {
  return (
    <div>

      <Mainpage />
      <Add />
    </div>

  )
}


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active_page: 'login'
    }

    window.addEventListener('hashchange', this.onHashChange.bind(this));

  }

  componentDidMount() {
      this.onHashChange();
  }

  onHashChange() {
    this.setState({
      active_page: window.location.hash ? window.location.hash.toString().slice(1) : this.state.active_page
    });
  }

  render() {
    return (
      <div>
        <Head title={"Focused " + this.state.active_page} />
        <Belt />
        {
          this.state.active_page === 'login' ?
          <LoginPage /> : this.state.active_page === 'main' ?
          <Mainpage /> :
          this.state.active_page === 'registration'? <Registration /> :this.state.active_page === 'add'? <AddEvent />:
          <div>404 /n page not found</div>
        }
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
