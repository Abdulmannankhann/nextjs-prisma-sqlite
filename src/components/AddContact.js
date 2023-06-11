import { useState } from "react"

export default function AddContact(){
	const [formData,setFormData] = useState({
		firstName:"",
		lastName:"",
		email:"",
		avatar:""
	})

	const handleSubmit = async () => {
		const response = await fetch('/api/contact/add-contact',{
			method:"POST",
			body:JSON.stringify(formData)
		})

	if(response?.ok == true){
		window.location.reload()
	}
	}
	

	return <div style={{display:'flex',flexDirection:'column',gap:'10px',margin:'20px',justifyItems:'center',alignItems:'center'}}>
		<div>Basic Form</div>
	<div>
	<input placeholder="First Name" title="First Name" value={formData.firstName} onChange={(e)=>{setFormData((pre)=>({...pre,firstName:e.target.value}))}}/>
	</div>
	<div>
	<input placeholder="Last Name" title="Last Name" value={formData.lastName} onChange={(e)=>{setFormData((pre)=>({...pre,lastName:e.target.value}))}}/>
	</div>
	<div>
	<input placeholder="Email" title="Email" value={formData.email} onChange={(e)=>{setFormData((pre)=>({...pre,email:e.target.value}))}}/>
	</div>
	<div>
	<input placeholder="Avatar" title="Avatar" value={formData.avatar} onChange={(e)=>{setFormData((pre)=>({...pre,avatar:e.target.value}))}}/>
	</div>
	<div>
		<button onClick={handleSubmit}>Add contact</button>
	</div>
	</div>
}