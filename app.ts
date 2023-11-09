import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client'
const { v4: uuidv4 } = require('uuid')

const prismaClient = new PrismaClient();

const app = express();
app.use(express.json());

//middleware para checar se usuário existe
async function checkUserExist(req: Request, res: Response, next: NextFunction) {
    const username = req.headers.username as string;

    const userExist = await prismaClient.user.findUnique({
        where: { username: username }
    });

    if (userExist) {
        return res.status(400).json({ Error: "Usuário já existente" });
    }

    return next();
}

//ações para o usuário
app.post('/usuario', async (req, res) => {
    const { name, username } = req.body;

    const userExist = await prismaClient.user.findFirst({
        where: {
            name: name
        }
    });

    if (userExist) {
        return res.status(400).json({ error: "Usuário já existente!" })
    }

    const newUser = await prismaClient.user.create({
        data: {
            name,
            username,
            technologies: { create: [] }
        }
    });

    return res.status(200).json(newUser);
});

//ações para a tecnologia
app.post('/tecnologia', checkUserExist, async (req, res) => {
    const { title } = req.body;
    const username = req.headers.username as string;

    const newTechnology = await prismaClient.technologies.create({
        data: {
            title,
            usuario: {
                connect: {
                    username: username
                }
            }
        }
    });

    console.log(newTechnology);

});
app.get('tecnologia', checkUserExist, (req, res) => {

});
app.delete('tecnologia', checkUserExist, (req, res) => {

});
app.patch('tecnologia', checkUserExist, (req, res) => {

});

app.listen(2222, () => {
    console.log("Conectado");
})