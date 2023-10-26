import { PrismaClient } from "@prisma/client"
import { Router, Request, Response } from "express"
import { z } from "zod";

const router = Router()
const prisma = new PrismaClient()

const idSchema = z.number();
const gameTitleIdSchema = z.number();
const clanIdSchema = z.number();
const nameSchema = z.string().nonempty("O parametro name é obrigatório")
const historySchema = z.string().nonempty("O parametro history é obrigatório")
const characterSummarySchema = z.string().nonempty("O parametro character_summary é obrigatório")

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

    const clanSchema = z.object({
      game_title_id: gameTitleIdSchema,
      clan_id: clanIdSchema,
      name: nameSchema,
      history: historySchema,
      character_summary: characterSummarySchema,
    }).required();

    const resultZod = clanSchema.safeParse(data);

    if (!resultZod.success) {
      return res.status(400).json(resultZod.error);
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

    const { id, game_title_id, clan_id, name, history, character_summary } = req.body;

    const clanSchema = z.object({
      id: idSchema,
      game_title_id: gameTitleIdSchema,
      clan_id: clanIdSchema,
      name: nameSchema,
      history: historySchema,
      character_summary: characterSummarySchema,
    }).required();

    const resultZod = clanSchema.safeParse(req.body);

    if (!resultZod.success) {
      return res.status(400).json(resultZod.error);
    } 

    try {

        const character = await prisma.characters.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!character) {
            return res.status(400)
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

    const clanSchema = z.object({
        id: idSchema,
    }).required();

    const resultZod = clanSchema.safeParse(req.body);

    if (!resultZod.success) {
        return res.status(400).json(resultZod.error);
    } 

    try {

        const character = await prisma.characters.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!character) {
            return res.status(400)
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