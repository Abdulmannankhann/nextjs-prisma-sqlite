import { PrismaClient } from "@prisma/client";

const prisma = PrismaClient()

const Handler = async (req,res) => {
	if(req.method == "GET"){
		const contacts = await prisma.contact.findMany();
		res.status(200).json(contacts)
	}
}
export default Handler