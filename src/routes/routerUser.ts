import express from 'express';
import { createUser } from '../controller/usuarioController';

const routesUser = express();

//ações para o usuário
routesUser.post('/usuario', createUser);

export {routesUser}