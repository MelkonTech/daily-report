import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
}));
class AlignItemsList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      reports:[]
    }
    this.getAllReports()
    this.getAllReports = this.getAllReports.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  


  getAllReports() {
    let { socket } = this.props.state;
    socket.emit('getAllReports',this.props.state.user._id);
    socket.on('getAllReportsSuccees',(rep) =>{
      this.setState({reports: rep });
    })
    socket.on('getAllReportsError',(error) =>{
      console.log(error)
    })
  }
  
  handleChange = (reportId) => {
    let {socket} = this.props.state
    socket.emit("reportAccept",reportId)
    socket.on("reportAcceptSuccees", () => { 
      this.getAllReports()
    })
  };
  
    render(){
      const {classes} = this.props;
  return (
    <div>
    <Paper className={classes.paper}>
    {this.state.reports.map(report => {
      return (
    <Grid container spacing={2} key={report._id}>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1">
              {report.author.name}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {report.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              spent {report.spent} hour(s)  --  {report.estimation} estimation
            </Typography>
          </Grid>
          <Grid item>
          <Button variant="contained" color={report.isAccepted ? "primary" : 'secondary'} onClick={() => { return this.handleChange(report._id)}} className={classes.button}>
          {report.isAccepted ? "Decline" : "Accept"}
        </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid> )})}

  </Paper>
    </div>
  );
        }
}


export default withStyles(useStyles)(AlignItemsList)