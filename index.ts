import { UUID, randomUUID } from "crypto";

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

type user = {
    id: UUID,
    name: string,
    username: string
    technologies: []
}


app.post('/tecnologias', (req, res) => {

});

app.post('/usuarios', (req, res) => {
    
});

app.get('/tecnologias', (req, res) => {
    
})

app.put('/tecnologias', (req, res) => {
    
})

app.delete('/tecnologias', (req, res) => {
    
})

app.patch('/tecnologias', (req, res) => {
    
})


const port = 4000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})