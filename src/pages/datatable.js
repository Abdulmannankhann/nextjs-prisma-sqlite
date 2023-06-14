import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { PrismaClient } from '@prisma/client';
import { Button } from '@mui/material';
import AddUser from '@/components/AddUser';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const prisma = new PrismaClient();

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	borderRadius:"10px"
  };

export default function DataTable({initialContacts}) {
	const [dynamicContacts,setDynamicContacts] = React.useState(initialContacts)
	const [toDeleteId,setToDeleteId] = React.useState(null)
	
	function computeMutation(newRow, oldRow) {
		if (newRow.firstName !== oldRow.firstName) {
		  return `First Name from '${oldRow.firstName}' to '${newRow.firstName}'`;
		}
		if (newRow.lastName !== oldRow.lastName) {
		  return `Last Name from '${oldRow.lastName || ''}' to '${newRow.lastName || ''}'`;
		}
		if (newRow.age !== oldRow.age) {
			return `Age from '${oldRow.age || ''}' to '${newRow.age || ''}'`;
		  }
		  if (newRow.email !== oldRow.email) {
			return `Email from '${oldRow.email || ''}' to '${newRow.email || ''}'`;
		  }
		  if (newRow.avatar !== oldRow.avatar) {
			return `Avatar from '${oldRow.avatar || ''}' to '${newRow.avatar || ''}'`;
		  }
		return null;
	  }

	//const processRowUpdate = React.useCallback(
	//	async (newRow) => {
	//	  // Make the HTTP request to save in the backend
	//	  const response = await fetch('/api/contact/update-contact',{
	//		method:"PATCH",
	//		body:JSON.stringify(newRow)
	//	})
	//	const data = await response.json()
	//	if(response.ok){
	//		setSnackbar({ children: 'User successfully saved', severity: 'success' });
	//	}
	//	  return data.data;
	//	},
	//	[],
	//  );

	  const processRowUpdate2 = React.useCallback(
		async (newRow, oldRow) => {
			// Make the HTTP request to save in the backend
			const mutation = computeMutation(newRow, oldRow);
			if (mutation) {
				const response = await fetch('/api/contact/update-contact',{
					method:"PATCH",
					body:JSON.stringify(newRow)
				})
				const data = await response.json()
				if(response.ok){
					setSnackbar({ children: 'User successfully saved', severity: 'success' });
					refresh('update')
				}
				  return data.data;
			  } else {
				return oldRow; // Nothing was changed
			  }
			
		  },
		[],
	  );

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
const columns = [
	{ field: 'id', headerName: 'Id', width: 150, editable: false },
	{ field: 'firstName', headerName: 'First Name', width: 150, editable: true },
	{ field: 'lastName', headerName: 'Last Name', width: 150, editable: true },
	{ field: 'email', headerName: 'Email ID', width: 150, editable: true },
	{ field: 'avatar', headerName: 'Avatar Link', width: 400, editable: true },
	{ field: 'age', headerName: 'Age', type: 'number', editable: true ,align:'right', width: 150},
	{
		field: "actions",
		headerName: "Actions",
		sortable: false,
		width: 140,
		editable: false,
		disableClickEventBubbling: true,
		renderCell: (params) => {
			return (
				<div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
					<Button style={{color:'black'}} onClick={(e)=>{
						setToDeleteId(params.row.id)
						handleOpen()
						}}>
					<DeleteIcon/>
					</Button>
				 </div>
			);
		 }
	  }
  ];
  
  const refresh = async (mode) => {
	const response = await fetch('/api/contact/get-all')
	const data = await response.json()
	if(response.ok){
		setDynamicContacts(data)
		if(mode == 'add'){
			setSnackbar({ children: 'User added successfully', severity: 'success' });
		}
		if(mode == 'delete'){
			handleClose(	)
			setSnackbar({ children: 'User deleted successfully', severity: 'success' });
		}
	}
  }

  const handleDelete = async () => {
	const id = toDeleteId;
	const response = await fetch(`/api/contact/delete/${id}`,{
		method:"DELETE",
	})
	if(response?.ok == true){
		refresh('delete')
		setToDeleteId(null)
	}
  }

  return (<>
    <div style={{ height: 800, width: '100%' }}>
		<div  style={{ textAlign:'center',margin:'20px',fontWeight:600 }}>Dynamic Data Table</div>
		<AddUser refresh={refresh}/>

      <DataGrid
        rows={dynamicContacts}
        columns={columns}
        processRowUpdate={processRowUpdate2}
        onProcessRowUpdateError={handleProcessRowUpdateError}
      />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={3000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar >
      )}
    </div>
	<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center'}}>
            Are you sure you want to delete!
          </Typography>
		  <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:'30px'}}>
		  <Button onClick={handleClose} style={{color:'black',border:'black'}} variant='outlined' startIcon={<CloseIcon/>}>No</Button>
          <Button onClick={handleDelete} style={{color:'black',border:'black'}} variant='outlined' startIcon={<CheckIcon/>}>Yes</Button>
		  </div>
        </Box>
      </Modal>
	  </>
  );
}

export async function getServerSideProps() {
	const contacts = await prisma.contact.findMany();
	return {
	  props: {
		initialContacts: contacts
	  }
	};
  }