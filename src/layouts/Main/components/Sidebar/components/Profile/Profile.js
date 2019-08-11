import React from 'react';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {  Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className,  ...rest } = props;
  const history = props.history
  const classes = useStyles();

  const user = {
    name: "history.user.name",
    type: "history.user.type"
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
      <Typography variant="body2">{user.type}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object
};

export default withRouter(Profile);
