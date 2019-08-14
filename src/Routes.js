import React from 'react';
import { Switch, Redirect,Route, withRouter } from 'react-router-dom';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  UserList as UserListView,
  Reports as ReportsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from './views';
import openSocket from 'socket.io-client';

class Routes extends React.Component {
  constructor(props) {
    super(props);
    const socket = openSocket('http://localhost:4001');
    this.state = {
      user: {},
      socket: socket
    };
    this.getuser()
    this.getuser = this.getuser.bind(this);
    this.logout = this.logout.bind(this);
  }

  getuser() {
    let { socket } = this.state;
    let localToken = localStorage.getItem('token');
    console.log(localToken)
    if (localToken) {
      console.log('geting User',this.state);
      socket.emit('getUser', localToken);
      socket.on('getUserSuccees', user => {
        this.setState({
          user: user
        });
      });
    }
  }

  logout(){
    localStorage.removeItem("token")
    console.log('logout main',this.state)
    this.setState({
      user:{}
    })
  }
  render() {
    console.log('render state',this.state)
    let loged = localStorage.getItem('token') ? '/reports' : '/sign-in';
    return (
      <Switch>
        <Redirect exact from="/" to={loged} />
        
        {this.state.user.type === "admin" ? (
           (
             <div>
            <Route
          render={() => (
            <MainLayout {...this }>
              <UserListView {...this} />
            </MainLayout>
          )}
          exact
          path="/users"
        />
        <Route
          render={() => (
            <MainLayout {...this }>
              <UserListView {...this} />
            </MainLayout>
          )}
          exact
          path="/notifications"
        />
        </div>
          )
        ) : null}
        <Route
          render={() => (
            <MainLayout {...this}>
              <ReportsView {...this} />
            </MainLayout>
          )}
          exact
          path="/reports"
        />
        <Route
          render={() => (
            <MinimalLayout>
              <SignUpView {...this} />
            </MinimalLayout>
          )}
          exact
          path="/sign-up"
        />
        <Route
          render={() => (
            <MinimalLayout >
              <SignInView  {...this} />
            </MinimalLayout>
          )}
          exact
          path="/sign-in"
        />
        <Route
          render={() => (
            <MinimalLayout>
              <NotFoundView {...this} />
            </MinimalLayout>
          )}
          exact
          path="/not-found"
        />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}

export default withRouter(Routes);
