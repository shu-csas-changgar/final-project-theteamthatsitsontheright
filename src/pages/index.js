import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Index extends React.Component {
  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogContent>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input id="email" name="email" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input name="password" type="password" id="password" autoComplete="current-password" />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Sign in
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <Typography variant="h4" gutterBottom>
          ABC Corp's Device Interface
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Please enter your credentials below
        </Typography>
        <Button variant="contained" color="secondary" onClick={this.handleClick}>
          Login Form
        </Button>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
