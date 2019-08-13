import React from 'react';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Reports as ReportsView,
  Account as AccountView,
  Settings as SettingsView,
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
      socket: socket,
      getUser: this.getUser,
      logout: this.logout
    };
    this.getUser();
    this.getUser = this.getUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  getUser() {
    let { socket } = this.state;
    let localToken = localStorage.getItem('token');
    if (localToken) {
      console.log('geting User');
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
    console.log('routes history', this.props);
    this.props.history.push('/sign-in');
    this.setState({
      user: {}
    });
  }
  render() {
    console.log('render state', this.state);
    let loged = localStorage.getItem('token') ? '/account' : '/sign-in';
    return (
      <Switch>
        <Redirect exact from="/" to={loged} />
        <Route
          render={() => (
            <MainLayout {...this.state}>
              <UserListView {...this.state} />
            </MainLayout>
          )}
          exact
          path="/users"
        />
        <Route
          render={() => (
            <MainLayout {...this.state}>
              <ProductListView {...this.state} />
            </MainLayout>
          )}
          exact
          path="/products"
        />
        <Route
          render={() => (
            <MainLayout {...this.state}>
              <TypographyView {...this.state} />
            </MainLayout>
          )}
          exact
          path="/typography"
        />
        <Route
          render={() => (
            <MainLayout {...this.state}>
              <ReportsView {...this.state} />
            </MainLayout>
          )}
          exact
          path="/Reports"
        />
        <Route
          render={() => (
            <MainLayout {...this.state}>
              <AccountView {...this.state} />
            </MainLayout>
          )}
          exact
          path="/account"
        />
        <Route
          render={() => (
            <MainLayout {...this.state}>
              <SettingsView {...this.state} />
            </MainLayout>
          )}
          exact
          path="/settings"
        />
        <Route
          render={() => (
            <MinimalLayout>
              <SignUpView {...this.state} />
            </MinimalLayout>
          )}
          exact
          path="/sign-up"
        />
        <Route
          render={() => (
            <MinimalLayout>
              <SignInView {...this.state} />
            </MinimalLayout>
          )}
          exact
          path="/sign-in"
        />
        <Route
          render={() => (
            <MinimalLayout>
              <NotFoundView {...this.state} />
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
