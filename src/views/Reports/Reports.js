import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';

const useStyles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  container: {
    display: 'flex',
    margin:"20px",
    padding:"10px",
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  iconSmall: {
    fontSize: 20,
  },
  adornmentSpend:{
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  gridList: {
    width: 800,
    height: 450,
    transform: 'translateZ(0)',
  },
  me:{
    fontSize:30,
    backgroundColor:theme.palette.primary.main
  },
  someone:{
    fontSize:20
  }
});

class AlignItemsList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      description: '',
      estimation: '',
      spent:'',
      reports:[],
    }
    this.getReports()
    this.handleChange = this.handleChange.bind(this)
    this.handleSend = this.handleSend.bind(this)
    this.getReports = this.getReports.bind(this)
  }
  
  handleChange = name => event => {
    if ((name === 'estimation') && ((parseInt(event.target.value) < 1) || (parseInt(event.target.value) > 10)) ) {
      event.target.value = 0
    }else if((name === 'spent') && ((parseInt(event.target.value) < 0) || (parseInt(event.target.value) > 24)) ){
      event.target.value = 0
    }else{
      this.setState({
        [name]:event.target.value
      })
    }
  };


  handleSend = () => {
    let {socket, user} = this.props.state
    let {description,estimation,spent} = this.state
    socket.emit("sendReport",user._id,description,estimation,spent)
    socket.on("sendReportSuccees",() => {
      socket.emit('getReports')

    })
  }

  getReports() {
    console.log('get Reports',this.props)
    let { socket } = this.props.state;
    socket.emit('getReports',this.props.state.user._id);
    socket.on('getReportsSuccees',(rep) =>{
      this.setState({reports: rep });
      console.log(this.state.reports)
    })
  }
  
    render(){
      const {classes} = this.props;
  return (
    <div>
    <form className={classes.container} noValidate autoComplete="off">
          <TextField
        id="filled-dense-multiline"
        label="Description"
        value={this.state.description}
        className={clsx(classes.textField)}
        onChange={this.handleChange('description')}
        multiline
        rowsMax="4"
      />
      <TextField
        id="filled-number"
        label="estimation "
        value={this.state.estimation}
        onChange={this.handleChange('estimation')}
        type="number"
        className={classes.textField}
      />
        <Input
          id="adornmentSpend"
          value={this.state.spent}
          onChange={this.handleChange('spent')}
          className={clsx(classes.textField)}
          type="number"
          endAdornment={<InputAdornment position="end">Hour(s)</InputAdornment>}
          label="Spent"
          variant="filled"
        />
        <Button variant="contained" color="primary" onClick={this.handleSend} className={classes.button}>
        Send
        </Button>
 
      </form>
      <GridList spacing={1} className={classes.gridList}>
      <List className={classes.root}>
      {this.state.reports.map(report => {
        // console.log(history.user.email,report.author.email)
        // let cls = report.author.email === history.user.email ? this.state.me : this.state.someone
        return (
        <div>
        <ListItem alignItems="flex-start">
        <ListItemText
        
          // className={cls}
          primary={`${report.author.name} - ${report.author.type}`}
          secondary={
            <React.Fragment>
              <Typography 
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
              </Typography>
              {report.description}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </div>
      )})}

    </List>
      </GridList>
    
    </div>
  );
        }
}


export default withStyles(useStyles)(AlignItemsList)