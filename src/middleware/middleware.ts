import express, { Request, Response, NextFunction } from 'express';
import { prismaClient } from '../database/prismaClient'

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

export { checkUserExist };