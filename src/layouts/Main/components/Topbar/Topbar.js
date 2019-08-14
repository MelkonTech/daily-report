import React from 'react';
import { Link as RouterLink , withRouter} from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar,  Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen,logout, history} = props;

  const classes = useStyles();

  const onSignOut = () => {
    console.log('logout', props);
    logout();
    history.push("/sign-in")
  };
  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src="/images/logos/logo--white.png" width="50px" />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={onSignOut}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default withRouter(Topbar);
