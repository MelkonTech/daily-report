import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

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
  const { className } = props;
  const { name, type,email } = props.state.user;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Typography className={classes.name} variant="h4">
        {name}
      </Typography>
      <Typography className={classes.name} variant="h5">
        {email}
      </Typography>
      <Typography variant="body2">{type}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
