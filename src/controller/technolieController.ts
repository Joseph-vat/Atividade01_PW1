import express, { Request, Response, NextFunction } from 'express';
import { prismaClient } from '../database/prismaClient'

//ações para a tecnologia
export async function createTechonlogy(req: Request, res: Response) {
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
};

export async function findTechonlogy(req: Request, res: Response) {
    const username = req.headers.username as string;

    const technologies = await prismaClient.technologies.findMany({
        where: {
            usuarioRef: username
        }
    });

    return res.status(200).json(technologies);

};

export async function deleteTechonlogy(req: Request, res: Response) {
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
};

export async function updateTechonlogy(req: Request, res: Response) {
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
};

export async function updateTechonlogyStudied(req: Request, res: Response) {
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

    return res.status(200).json({ Mensage: "Tecnologia estudada!" })
};