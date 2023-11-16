import express, { Request, Response, NextFunction } from 'express';
import { prismaClient } from '../database/prismaClient'

//ações para o Usuário
export async function createUser(req: Request, res: Response) {
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
};