import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import "./ChooseOption.css"
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChooseOption = () => {
    const [open, setOpen] = React.useState(false);
    const navigate =useNavigate();
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleDishButton =()=>{
        navigate('/CreateDishes')
    }

    
     const handleUploadWork =()=>{
        navigate('/UploadWork')
    }
    const handleClose = () => {
        setOpen(false);
    };

  return (
    <React.Fragment>
      <h1>Welcome to The Admin Page </h1>

      <Button variant="outlined" onClick={handleClickOpen}>
        Click here to start
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition} 
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"   Select any one option :"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <span className='edit'>Do You Want to Create/Set Menu or Upload Your work </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDishButton}>Create</Button>
          <Button onClick={handleUploadWork}>Upload work</Button>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ChooseOption;
