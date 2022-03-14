import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  loadingText: {
    marginTop: 30,
  },
}))

const Loader = ({ message }) => {

  const classes = useStyles();

  return (
    <Container className={classes.loadingContainer}>
      <CircularProgress size={80} className={classes.loadingAnamation} />
      <Typography variant="h6" color="inherit" className={classes.loadingText}>
        {message}
      </Typography>
    </ Container>
  );
};

Loader.defaultProps = {
  message: "Loading"
}

export default Loader;