import { useState } from 'react';
import { PrismaClient } from '@prisma/client';
import AddContact from '@/components/AddContact';
import Link from 'next/link';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const contacts = await prisma.contact.findMany();
  return {
    props: {
      initialContacts: contacts
    }
  };
}

export default function Index({ initialContacts }) {
  const [contacts, setContacts] = useState(initialContacts);

  const handleDelete = async (id) => {
	const response = await fetch(`/api/contact/delete/${id}`,{
		method:"DELETE",
	})
	if(response?.ok == true){
		window.location.reload()
	}
}


  return (
    <>
	{/*<AddContact/>
     <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
    <div style={{margin:'50px',marginBottom:'20px'}}>Conatct List</div>
    {contacts.map((v)=>{
	return <div key={v.id} style={{display:'flex',gap:'20px',margin:'20px'}}>
	    <img src={v.avatar} width={50} height={50} alt="Picture of the author" />
		<div>
		<div>Name: {v.firstName} {v?.lastName}</div>
		<div>Email: {v.email}</div>
		</div>
		<div>
		<button onClick={()=>{handleDelete(v?.id)}}>Delete</button>
		</div>
		</div>})}
	  </div>*/}
	  <div style={{display:"flex",flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
		<div>
	  Hi - Click below to visit Dynamic Data Table
		</div>
	  <Link href="/datatable" legacyBehavior>
	  <a>DataTable</a>
	  </Link>
	  </div>
    </>
  );
}