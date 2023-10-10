import { PrismaClient } from "@prisma/client"
import { Router, Request, Response } from "express"

const router = Router()
const prisma = new PrismaClient()

export const list = async (req: Request, res: Response) => {

    let id: any|null = req.query.id ?? null
    let clan = null

    try {
        if (req.query.id) {
            clan = await prisma.game_titles.findUnique({
                where: {
                    id: parseInt(id)
                }
            })
        } else {
            clan = await prisma.game_titles.findMany()
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

    const data = req.body

    if (!data.title) {
        res.status(400)
        .json({
            message: 'O parametro title é obrigatório'
        })
    }

    if (!data.console) {
        res.status(400)
        .json({
            message: 'O parametro console é obrigatório'
        })
    }

    if (!data.release_date) {
        res.status(400)
        .json({
            message: 'O parametro release_date é obrigatório'
        })
    }

    if (!data.cover_link) {
        res.status(400)
        .json({
            message: 'O parametro cover_link é obrigatório'
        })
    }

    try {
        const clan = await prisma.game_titles.create({ data })
        res.status(201).json(clan)
    } catch (error) {
        res.status(500).json({
            message: 'Ocorreu um problema ao criar um novo titulo'
        })
    }
}

export const update = async(req: Request, res: Response)=>{

    const { id, title, console, release_date, cover_link } = req.body

    try {

        const clan = await prisma.game_titles.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!clan) {
            res.status(400)
            .json({ message: `O titulo ${ title } não foi encontrado para edição` })
        }

        const update = await prisma.game_titles.update({
            where: {
                id: id
            },
            data:{ title, console, release_date, cover_link }
        })

        res.status(200)
        .json(update)
    } catch (error) {
        res.status(500)
        .json({ message: `Ocorreu um problema ao atualizar o titulo ${title}` })
    }
}

export const remove = async (req: Request, res: Response) => {

    const { id } = req.body

    try {

        const game_titles = await prisma.game_titles.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!game_titles) {
            res.status(400)
            .json({ message: `Não foi possivel deletar o titulo` })
        }

        await prisma.game_titles.delete({
            where: {
                id: id,
            },
        })

        res.status(200)
        .json({})
    } catch (error) {
        res.status(500)
        .json({ message: `Ocorreu um problema ao deletar o titulo` })
    }
}