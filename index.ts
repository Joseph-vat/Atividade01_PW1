import { UUID, randomUUID } from "crypto";
import { Request, Response, NextFunction } from 'express';


const express = require('express');
const { v4: uuidv4 } = require('uuid')
const app = express();

app.use(express.json());


type technologies = {
    id: UUID,
    title: string,
    studied: boolean,
    deadline: Date,
    created_at: Date
}

type userTemp = {
    id: UUID,
    name: string,
    username: string
    technologies: []
}

const arrayDeUsersTemp = [] as userTemp[];

function checkUserExist(req: Request, res: Response, next: NextFunction) {
    const { username } = req.headers;
    const userExist = arrayDeUsersTemp.find((arrayDeUsersTemp) => arrayDeUsersTemp.username === username);

    if (!userExist) {
        return res.status(400).json({ error: 'Mensagem do erro' })
    }

    req.user = userExist;

    return next();
}

app.post('/usuario', (req, res) => {
    const { name, username } = req.body;

    const userRepeated = arrayDeUsersTemp.find((arrayDeUsersTemp) => arrayDeUsersTemp.username === username);

    if (!userRepeated) {
        return res.status(400).json({ error: 'Username já cadastrado!' })
    }

    const newUser: userTemp = {
        id: uuidv4(),
        name,
        username,
        technologies: []
    }


    return res.status(200).json(newUser);

});

// inserindo nova tecnologia
app.post('/tecnologia', checkUserExist, (req, res) => {
    const { title, studied, deadline } = req.body;

    const newTechnology: technologies = {
        id: uuidv4(),
        title,
        studied,
        deadline: new Date(deadline),
        created_at: new Date()
    }

    const userGlobal = req.user;

    userGlobal.technologies.push(newTechnology);

    console.log(arrayDeUsersTemp);
    return res.json(newTechnology);
});


app.get('/tecnologia', (req, res) => {

})

app.put('/tecnologia', (req, res) => {

})

app.delete('/tecnologia', (req, res) => {

})

app.patch('/tecnologia', (req, res) => {

})


const port = 4000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})