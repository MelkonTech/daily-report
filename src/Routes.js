import React from 'react';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  UserList as UserListView,
  Reports as ReportsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Notifications as NotificationsView
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
    this.getuser();
    this.getuser = this.getuser.bind(this);
    this.logout = this.logout.bind(this);
  }

  getuser() {
    let { socket } = this.state;
    let localToken = localStorage.getItem('token');
    if (localToken) {
      socket.emit('getUser', localToken);
      socket.on('getUserSuccees', user => {
        this.setState({
          user: user
        });
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.setState({
      user: {}
    });
  }
  render() {
    let loged = this.state.user ? '/reports' : '/sign-in';
    if (this.state.user.type === 'PM') {
      return (
        <Switch>
          <Redirect exact from="/" to={loged} />

          <Route
            render={() => (
              <MainLayout {...this}>
                <NotificationsView {...this} />
              </MainLayout>
            )}
            exact
            path="/notifications"
          />

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
              <MinimalLayout>
                <SignInView {...this} />
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
    } else if (this.state.user.type === 'admin') {
      return (
        <Switch>
          <Redirect exact from="/" to={loged} />

          <Route
            render={() => (
              <MainLayout {...this}>
                <UserListView {...this} />
              </MainLayout>
            )}
            exact
            path="/users"
          />
          <Route
            render={() => (
              <MainLayout {...this}>
                <NotificationsView {...this} />
              </MainLayout>
            )}
            exact
            path="/notifications"
          />
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
              <MinimalLayout>
                <SignInView {...this} />
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
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Redirect exact from="/" to={loged} />

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
              <MinimalLayout>
                <SignInView {...this} />
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
}

export default withRouter(Routes);
