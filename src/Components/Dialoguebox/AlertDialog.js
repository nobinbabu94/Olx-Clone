import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
import {useContext} from 'react';
// import firebase from '../../firebase/config'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
function AlertDialog() {

const {firebase} = useContext(FirebaseContext)
const history = useHistory()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Logout
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{paddingLeft:75, fontSize: 'large', color:'orange'}}>
        <span ><ErrorOutlineIcon /></span>
        </div>
        <DialogTitle id="alert-dialog-title">
          {"   Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
         
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            <div onClick={()=>{
          firebase.auth().signOut();
          localStorage.removeItem('token')
          history.push('/login')
        }}> Logout</div>
          
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog;