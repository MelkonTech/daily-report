import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersToolbar, UsersTable } from './components';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4001');
socket.emit("getUsers")

var userss = []
socket.on("getUsersSuccees", (users) => {
   userss = users;
   console.log(users)
})
socket.on("getUserError",(error) => {
})


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
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
