import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4001');

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};


export default class App extends Component {
  constructor(){
    super()
    this.state = {
      myUser:{}
    }
  }
  onHistoryChange(newUser){
    this.setState({user:newUser})

  }
  componentWillMount(){
    let localToken = localStorage.getItem('token')
if(localToken){
    socket.emit('getUser',localToken)
    socket.on('getUserSuccees', user => {
      browserHistory.user = user
      this.setState({
        myUser:user
      })
    })
  }
  }
  render() {
//     let localToken = localStorage.getItem('token')
// if(localToken){
//   socket.emit('getUser',localToken)
//   socket.on('getUserSuccees', user => {
//     browserHistory.user = user
  // })
// }
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory} >
          <Routes myHistory={this.state} onHistoryChange={this.onHistoryChange} socket={socket}/>
        </Router>
      </ThemeProvider>
    );
  }
}
