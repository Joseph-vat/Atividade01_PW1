import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient, Technologies } from '@prisma/client'
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

    if (!userExist) {
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
        }
    });

    return res.status(200).json(newUser);
});

//ações para a tecnologia
app.post('/tecnologia', checkUserExist, async (req, res) => {
    const { title } = req.body;
    const username = req.headers.username as string;

    const technology = await prismaClient.technologies.findFirst({
        where: {
            title: title
        }
    });

    if (technology) {
        return res.status(400).json({ error: "Tecnologia já cadastrada!" })
    }

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

    return res.status(200).json(newTechnology);
});

app.get('/tecnologia', checkUserExist, async (req, res) => {
    const username = req.headers.username as string;

    const technologies = await prismaClient.technologies.findMany({
        where: {
            usuarioRef: username
        }
    });

    return res.status(200).json(technologies);

});

app.delete('/tecnologia/:id', checkUserExist, async (req, res) => {
    const { id } = req.params;
    const username = req.headers.username as string;

    const technologiesExist = await prismaClient.technologies.findUnique({
        where: {
            id: id
        }
    });

    if (!technologiesExist) {
        return res.status(400).json({ Erro: "Id não existente" });
    }

    await prismaClient.technologies.delete({
        where: {
            id: id
        }
    });

    return res.status(200).json({ Mensage: "Deletado com sucesso!" })
});

app.put('/tecnologia/:id', checkUserExist, async (req, res) => {
    const { id } = req.params;
    const title = req.body.title as string;

    const technologiesExist = await prismaClient.technologies.findUnique({
        where: {
            id: id
        }
    });

    if (!technologiesExist) {
        return res.status(400).json({ Erro: "Id não existente" });
    }

    const updateTechnology = await prismaClient.technologies.update({
        where: {
            id
        },
        data: {
            title
        }
    });

    return res.status(200).json({ Mensage: "Atualizado com sucesso!" })
});

app.patch('/tecnologia/:id', checkUserExist, async (req, res) => {
    const { id } = req.params;
    const title = req.body.title as string;

    const technologiesExist = await prismaClient.technologies.findUnique({
        where: {
            id: id
        }
    });

    if (!technologiesExist) {
        return res.status(400).json({ Erro: "Id não existente" });
    }

    const updateTechnology = await prismaClient.technologies.update({
        where: {
            id
        },
        data: {
            studied: true
        }
    });

    return res.status(200).json({Mensage: "Tecnologia estudada!"})


});

app.listen(2222, () => {
    console.log("Conectado");
})