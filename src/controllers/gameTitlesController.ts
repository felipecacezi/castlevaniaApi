import { PrismaClient } from "@prisma/client"
import { Router, Request, Response } from "express"
import { z } from "zod"

const router = Router()
const prisma = new PrismaClient()

const titleSchema = z.string().nonempty("O parametro title é obrigatório")
const consoleSchema = z.string().nonempty("O parametro console é obrigatório")
const releaseDateSchema = z.date()
const coverLinkSchema = z.string().nonempty("O parametro cover_link é obrigatório")
const idSchema = z.number()

export const list = async (req: Request, res: Response) => {

    let id: any|null = req.query.id ?? null
    let clan = null

    try {

        if (req.query.id) {
            clan = await prisma.game_titles.findUnique({
                where: {
                    id: parseInt(id)
                }
            }) ?? {}
        } else {
            clan = await prisma.game_titles.findMany() ?? {}
        }

        res.status(200)
        .json(clan)

    } catch (error) {
        res.status(500)
        .json({
            message: 'Ocorreu um problema ao buscar o titulo informado'
        })
    }

}

export const create = async (req: Request, res: Response) => {

    let data = req.body
    data.release_date = new Date(data.release_date)

    const gameTitleSchema = z.object({
        title: titleSchema,
        console: consoleSchema,
        release_date: releaseDateSchema,
        cover_link: coverLinkSchema,
    }).required();

    const resultZod = gameTitleSchema.safeParse(data)

    if (!resultZod.success) {
        return res.status(400).json(resultZod.error);
    } 

    try {
        const gameTitle = await prisma.game_titles.create({
            data
        })
        res.status(201).json(gameTitle)
    } catch (error) {
        res.status(500).json({
            message: 'Ocorreu um problema ao criar um novo titulo'
        })
    }
}

export const update = async(req: Request, res: Response)=>{
    
    let data = req.body
    data.release_date = new Date(data.release_date)
    try {

        const gameTitleSchema = z.object({
            id: idSchema,
            title: titleSchema,
            console: consoleSchema,
            release_date: releaseDateSchema,
            cover_link: coverLinkSchema,
        }).required();

        const resultZod = gameTitleSchema.safeParse(data);

        if (!resultZod.success) {
            return res.status(400).json(resultZod.error);
        } 

        const gameTitle = await prisma.game_titles.findUnique({
          where: {
            id: parseInt(data.id)
          },
        });

        if (!gameTitle) {
            return res.status(400)
            .json({ message: `O titulo ${ data.title } não foi encontrado para edição` })
        }

        const update = await prisma.game_titles.update({
            where: {
                id: parseInt(data.id)
            },
            data:{ 
                "title": data.title, 
                "console": data.console, 
                "release_date": data.release_date, 
                "cover_link": data.cover_link 
            }
        })

        res.status(200)
        .json(update)
    } catch (error: any) {
        res.status(500)
        .json({ message: `Ocorreu um problema ao atualizar o titulo ${data.title}` })
    }
}

export const remove = async (req: Request, res: Response) => {

    const { id } = req.body

    const gameTitleSchema = z.object({
        id: idSchema
    }).required()

    const resultZod = gameTitleSchema.safeParse({ id })

    if (!resultZod.success) {
      return res.status(400).json(resultZod.error)
    } 

    try {

        const game_titles = await prisma.game_titles.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!game_titles) {
            return res.status(400)
            .json({ message: `Não foi possivel deletar o titulo` })
        }

        await prisma.game_titles.delete({
            where: {
                id: parseInt(id),
            },
        })

        res.status(200)
        .json({})
    } catch (error) {
        res.status(500)
        .json({ message: `Ocorreu um problema ao deletar o titulo` })
    }
}