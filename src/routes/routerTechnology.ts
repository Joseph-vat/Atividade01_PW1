import express, { Request, Response, NextFunction } from 'express';
import { createTechonlogy, findTechonlogy, deleteTechonlogy, updateTechonlogyStudied, updateTechonlogy } from '../controller/technolieController';
import { checkUserExist } from '../middleware/middleware';

const routesTechnology = express();

//ações para a tecnologia
routesTechnology.post('/tecnologia', checkUserExist, createTechonlogy);

routesTechnology.get('/tecnologia', checkUserExist, findTechonlogy);

routesTechnology.delete('/tecnologia/:id', checkUserExist, deleteTechonlogy);

routesTechnology.put('/tecnologia/:id', checkUserExist, updateTechonlogy);

routesTechnology.patch('/tecnologia/:id', checkUserExist, updateTechonlogyStudied);

export {routesTechnology};