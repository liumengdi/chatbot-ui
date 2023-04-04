import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({

  container: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    marginTop: '200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '30px',
    paddingRight: '30px',
    minWidth: '320px',

  },
  textField: {
    height: '3.5rem',
  },

  button: {
    backgroundColor: '#3f51b5',
    height: '3.5rem',
    width: '8rem',
    marginLeft: '10px',

  },
});



export default useStyles