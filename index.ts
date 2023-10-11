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
    // console.log(userExist);

    if (!userExist) {
        return res.status(404).json({ error: 'Usuario inexistente!' })
    }

    req.user = userExist;

    return next();
}

app.post('/usuario', (req, res) => {
    const { name, username } = req.body;

    const userRepeated = arrayDeUsersTemp.find((arrayDeUsersTemp) => arrayDeUsersTemp.username === username);

    if (userRepeated) {
        return res.status(400).json({ error: 'Username já cadastrado!' })
    }

    const newUser: userTemp = {
        id: uuidv4(),
        name,
        username,
        technologies: []
    }

    arrayDeUsersTemp.push(newUser);
    return res.status(201).json(newUser);

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

    // console.log(arrayDeUsersTemp);
    return res.status(201).json(newTechnology);
});


app.get('/tecnologia', checkUserExist, (req, res) => {
    const user = req.user as userTemp;
    return res.status(201).json(user);
})

app.put('/tecnologia/:id', checkUserExist, (req, res) => {
    const { title, deadline } = req.body;
    const { id } = req.params;
    const technologiesExist: technologies = req.user.technologies.find(tec => tec.id === id);
    technologiesExist.title = title;
    technologiesExist.deadline = new Date();

    return res.status(201).json(technologiesExist);
})

app.patch('/tecnologia/:id/:studied', checkUserExist, (req, res) => {
    const { id } = req.params;
    const { studied } = req.params;
    console.log(id, studied);
    
    const technologiesExist: technologies = req.user.technologies.find(tec => tec.id === id);
    
    console.log('technologiesExist');
    technologiesExist.studied = studied;
    return res.status(201).json(technologiesExist);
})

app.delete('/tecnologia/:id', checkUserExist, (req, res) => {
    const { id } = req.params;
    
    const userRepeated = arrayDeUsersTemp.find((arrayDeUsersTemp) => arrayDeUsersTemp.id === id);

    if (!userRepeated) {
        return res.status(404).json({ error: 'Id inválido!' })
    }

    const technologiesExist: technologies = req.user.technologies.filter(tec => tec.id !== id);

    const userGlobal = req.user;

    userGlobal.technologies = technologiesExist;

    return res.status(200).json(technologiesExist);
})


const port = 4000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})