import { PrismaClient } from "@prisma/client"
import { Router, Request, Response } from "express"

const router = Router()
const prisma = new PrismaClient()

export const list = async (req: Request, res: Response) => {

    let id: any|null = req.query.id ?? null
    let character = null

    try {
        if (req.query.id) {
            character = await prisma.characters.findUnique({
                where: {
                    id: parseInt(id)
                }
            })
        } else {
            character = await prisma.characters.findMany()
        }

        res.status(200)
        .json(character ?? [])

    } catch (error) {
        res.status(500)
        .json({
            message: 'Ocorreu um problema ao buscar o clan informado'
        })
    }

}

export const create = async (req: Request, res: Response) => {

    const data = req.body

    if (!data.game_title_id) {
      res.status(400).json({
        message: "O parametro game_title_id é obrigatório",
      });
    }

    if (!data.clan_id) {
      res.status(400).json({
        message: "O parametro clan_id é obrigatório",
      });
    }

    if (!data.name) {
      res.status(400).json({
        message: "O parametro name é obrigatório",
      });
    }

    if (!data.history) {
      res.status(400).json({
        message: "O parametro history é obrigatório",
      });
    }

    if (!data.character_summary) {
      res.status(400).json({
        message: "O parametro character_summary é obrigatório",
      });
    }

    try {
        const clan = await prisma.characters.create({ data })
        res.status(201).json(clan)
    } catch (error) {
        res.status(500).json({
            message: 'Ocorreu um problema ao criar um novo personagem'
        })
    }
}

export const update = async(req: Request, res: Response)=>{

    const { id, game_title_id, clan_id, name, history, character_summary } =
      req.body;

    try {

        const character = await prisma.characters.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!character) {
            res.status(400)
            .json({ message: `O personagem ${ name } não foi encontrado para edição` })
        }

        const update = await prisma.characters.update({
          where: {
            id: id,
          },
          data: { game_title_id, clan_id, name, history, character_summary },
        });

        res.status(200)
        .json(update)
    } catch (error) {
        res.status(500)
        .json({ message: `Ocorreu um problema ao atualizar o personagem ${name}` })
    }
}

export const remove = async (req: Request, res: Response) => {

    const { id } = req.body

    try {

        const character = await prisma.characters.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!character) {
            res.status(400)
            .json({ message: `Não foi possivel deletar o personagem` })
        }

        await prisma.characters.delete({
            where: {
                id: id,
            },
        })

        res.status(200)
        .json({})
    } catch (error) {
        res.status(500)
        .json({ message: `Ocorreu um problema ao deletar o personagem` })
    }
}