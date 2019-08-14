import React from 'react';
import { withStyles } from '@material-ui/styles';
import { UsersToolbar, UsersTable } from './components';

const Styles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: null
    };
    this.getUsers();
    this.getUsers = this.getUsers.bind(this);
  }

  getUsers() {
    let { socket } = this.props.state;
    socket.emit('getUsers', this.props.state.user.type);
    socket.on('getUsersSuccees', users => {
      this.setState({ users: users });
    });
    socket.on('getUsersError', error => {
      this.setState({ error: error });
      console.log(error);
    });
  }

  render() {
    let usersTable = this.state.error ? (
      <div>{this.state.error}</div>
    ) : (
      <UsersTable
        {...this.props}
        getUsers={this.getUsers}
        users={this.state.users}
      />
    );
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <UsersToolbar />
        <div className={classes.content}>{usersTable}</div>
      </div>
    );
  }
}

export default withStyles(Styles)(UserList);
