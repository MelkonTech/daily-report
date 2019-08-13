import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersToolbar, UsersTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = props => {
  console.log("userlist props",props )
  const {socket} = props
  var userss = []
  socket.emit("getUsers")
  socket.on("getUsersSuccees", (users) => {
   userss = users;
   console.log(users)
})
socket.on("getUserError",(error) => {
  console.log(error)
})
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={userss} />
      </div>
    </div>
  );
};

export default UserList;
