import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import ImageIcon from '@material-ui/icons/Image';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className } = props;
  const {type} = props.state.user
  const classes = useStyles();
  const pages = [
    {
      title: 'Reports',
      href: '/reports',
      icon: <ImageIcon />
    },
  ]

  if(type !== "Developer"){
    if(type === "admin"){
      pages.unshift({
        title: 'Users',
        href: '/users',
        icon: <PeopleIcon />
      },{
        title: 'Notifications',
        href: '/notifications',
        icon: <NotificationsIcon />
      })
    }else{
      pages.unshift({
        title: 'Notifications',
        href: '/notifications',
        icon: <NotificationsIcon />
      })
  }
  }
  

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        className={clsx(classes.root, className)}
      >
        <Profile {...props}/>
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
