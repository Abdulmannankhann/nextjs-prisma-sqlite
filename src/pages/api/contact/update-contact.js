import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const Handler = async (req,res) => {
	if (req.method !== 'PATCH') {
		return res.status(405).json({ message: 'Method not allowed' });
	  }
	
	  try {
		const contact = JSON.parse(req.body);
		const updatedContact = await prisma.contact.update({
			where: {
			  id: contact.id,
			},
			data: {
			  firstName: contact.firstName,
			  lastName: contact.lastName,
			  age: contact.age,
			  email: contact.email,
			  avatar: contact.avatar,
			},
		  })
		res.status(200).json({data:updatedContact,msg:"User data updated successfully"});
	  } catch (err) {
		res.status(400).json({ message: 'Something went wrong' });
	  }
}
export default Handler