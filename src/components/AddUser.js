import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';

export default function FormDialog({refresh}) {
	const initialState = {
		firstName:"",
		lastName:"",
		age:0,
		email:"",
		avatar:""
	}
  const [open, setOpen] = React.useState(false);
  const [formData,setFormData] = React.useState({...initialState})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddUser = async () => {
	const response = await fetch('/api/contact/add-contact',{
		method:"POST",
		body:JSON.stringify(formData)
	})

if(response?.ok == true){
	handleClose()
	setFormData({...initialState})
	refresh('add')
	//window.location.reload()
}
  }

  return (
    <div>
      <Button startIcon={<AddIcon />} size="small" onClick={handleClickOpen} style={{color:'black'}}>
        Add user
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{textAlign:'center'}}>Enter User Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
			value={formData.firstName}
			onChange={(e)=>{
				setFormData((pre)=>({...pre,firstName:e.target.value}))
			}}
          />
		    <TextField
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
			value={formData.lastName}
			onChange={(e)=>{
				setFormData((pre)=>({...pre,lastName:e.target.value}))
			}}
          />
		  	<TextField
            autoFocus
            margin="dense"
            id="age"
            label="Age"
            type="number"
            fullWidth
            variant="standard"
			value={formData.age}
			InputProps={{ inputProps: { min: 0 } }}
			onChange={(e)=>{
				setFormData((pre)=>({...pre,age:Number(e.target.value)}))
			}}
          />
		  	<TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Id"
            type="email"
            fullWidth
            variant="standard"
			value={formData.email}
			onChange={(e)=>{
				setFormData((pre)=>({...pre,email:e.target.value}))
			}}
          />
		  	<TextField
            autoFocus
            margin="dense"
            id="avatar"
            label="Avatar Link"
            type="text"
            fullWidth
            variant="standard"
			value={formData.avatar}
			onChange={(e)=>{
				setFormData((pre)=>({...pre,avatar:e.target.value}))
			}}
          />
		  
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{color:'black'}}>Cancel</Button>
          <Button onClick={handleAddUser} style={{color:'black'}}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
