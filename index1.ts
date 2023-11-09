import express, { Request, Response, NextFunction } from 'express';
import { execPath } from "process";
import { prismaClient } from "./prismaCliente";
const { v4: uuidv4 } = require('uuid')

const app = express();
app.use(express.json());

function checkUserExist(req: Request, res: Response, next: NextFunction) {
    const { username } = req.headers;

    const userExist = prismaClient.user.findMany();
    console.log(userExist);
    
    if (!userExist) {
        return res.status(404).json({ error: 'Usuario inexistente!' })
    }

    // req.user = userExist;

    return next();
}

app.post('/user', async (req, res) => {
    const { name, username } = req.body;

    const userExist = await prismaClient.user.findFirst({
        where: {
            name: name
        }
    });

    if (userExist !== null) {
        return res.status(400).json({ "Erro": "erro" });
    };

    const criandoUser = await prismaClient.user.create({
        data: {
            name,
            username,
            technologies: { create: [] }
        }
    });

    return res.status(201).json(criandoUser);
})

app.post('/tecnologia', checkUserExist, async (req, res) => {
    const { title, studied, deadline } = req.body;

    const criandoTechnology = await prismaClient.technologies.create({
        data: {
            title,
            studied,
             deadline
        }
    });

    const newTechnology: technologies = {
        id: uuidv4(),
        title,
        studied: false,
        deadline: new Date(deadline),
        created_at: new Date()
    }

    const userGlobal = req.user;

    userGlobal.technologies.push(newTechnology);

    // console.log(arrayDeUsersTemp);
    return res.status(201).json(newTechnology);
});

app.get('/technologies', checkUserExist, async (req, res) => {
    const { name } = req.body;

    const userExist = await prismaClient.user.findMany({
        where: {
            name: name
        }
    });

    if (userExist !== null) {
        return res.status(400).json({ "Erro": "Usuario nao encontrado" });
    };


})

app.listen(3000, () => {
    console.log("Conectado");
})