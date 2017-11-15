
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Helmet} from "react-helmet";

import {Belt} from './Belt';
import {Footer} from './Footer';
import {Head} from './Head';
import {Button} from './Button';
import {Form} from './Form';


function LoginPage() {
  return (
    <div>
      <Form />
      <Button text="zaloguj" class="button1" />
      <Button text="Zarejestruj się" class="button2" />
      <a href="#main">MAIN</a>
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
      active_page: window.location.hash.toString().slice(1)
    });
  }

  render() {
    return (
      <div>
        <Head />
        <Belt />
        {
          this.state.active_page === 'login' ?
          <LoginPage /> : this.state.active_page === 'main' ?
          <div>MAIN PAGE <a href="#login">LOGIN</a></div> :
          <div>Inna</div>
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
