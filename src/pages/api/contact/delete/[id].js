import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const Handler = async (req,res) => {
	const {id} = req.query
	if (req.method !== 'DELETE') {
		return res.status(405).json({ message: 'Method not allowed' });
	  }
	
	  try {
		const responseContact = await prisma.contact.delete({  where: {
			id:id,
		  }, });
		res.status(200).json(responseContact);
	  } catch (err) {
		res.status(400).json({ message: 'Something went wrong' });
	  }
}
export default Handler