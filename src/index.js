
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Helmet} from "react-helmet";



function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user1 = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const user2 = {
  firstName: 'Oliwia',
  lastName: 'Bar'
};



function getGreeting() {
  const tab = [];
  for(let i = 0; i<= 10; i++) {
    if(i % 2 == 0) {
      tab[i] = <h1>{formatName(user2)}</h1>;
    }else{
      tab[i] = <h1>{formatName(user1)}</h1>;
    }
  }
  return tab;
}

// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//       <p>dupa</p>
//       </div>
//   );
//
//   class Welcome extends React.Component {
//     render() {
//       return <h1> Hello, {this.props.name}</h1>;
//     }
//   }


function Head(props) {
  return (
    <Helmet>
      <meta http-equiv="content-type" content="text/html; charset=utf-8" />
      <title>Focused Logowanie</title>
      <link rel="stylesheet" href="main.css"/>
      <link href="https://fonts.googleapis.com/css?family=Amatic+SC|Dancing+Script" rel="stylesheet"/>
    </Helmet>
  );
};

function Belt(props) {
    return (
      <div class='belt'>
          <div class ='headings'>
            Focused
          </div>
        </div>
      );
  };

function Form() {
  return (
    <div class='helper'>
      <form>
        <input type="email" id="user-email" name="user-email" placeholder="Email" />
        <br />
        <br />
        <input type="password" name="psw" id="password" placeholder="Hasło" />
      </form>
    </div>
  );
};

class App extends React.Component {
  render() {
    return (
      <div>
        <Head />
        <Belt />
        <Form />
      </div>
    );
  }
}

  const element = <Belt name="Sara" a="hej" b="czesc" />;
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
