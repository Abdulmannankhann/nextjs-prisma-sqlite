import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const Handler = async (req,res) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	  }
	
	  try {
		const contact = JSON.parse(req.body);
		const savedContact = await prisma.contact.create({ data: contact });
		res.status(200).json(savedContact);
	  } catch (err) {
		res.status(400).json({ message: 'Something went wrong' });
	  }
}
export default Handler