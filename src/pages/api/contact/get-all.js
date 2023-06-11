import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const Handler = async (req,res) => {
		const contacts = await prisma.contact.findMany();
		res.status(200).json(contacts)
}
export default Handler