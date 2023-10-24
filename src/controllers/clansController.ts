import { PrismaClient } from "@prisma/client"
import { Router, Request, Response } from "express"
import { z } from "zod";

const router = Router()
const prisma = new PrismaClient()
const nameSchema = z.string().nonempty("O parametro name é obrigatório")
const clanSummarySchema = z.string().nonempty("O parametro clan_summary é obrigatório")
const idSchema = z.number()

export const list = async (req: Request, res: Response) => {

    let id: any|null = req.query.id ?? null
    let clan = null

    try {
        if (req.query.id) {
            clan = await prisma.clans.findUnique({
                where: {
                    id: parseInt(id)
                }
            }) ?? {}
        } else {
            clan = await prisma.clans.findMany() ?? {}
        }

        res.status(200)
        .json(clan)

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
        name: nameSchema ,
        clan_summary: clanSummarySchema
    }).required();

    const resultZod = clanSchema.safeParse(data)

    if (!resultZod.success) {
        return res.status(400).json(resultZod.error);
    } 

    try {
        const clan = await prisma.clans.create({ data })
        res.status(201).json(clan)
    } catch (error) {
        res.status(500).json({
            message: 'Ocorreu um problema ao criar um novo clan'
        })
    }
}

export const update = async(req: Request, res: Response)=>{

    const { id, name, clan_summary } = req.body

    const clanSchema = z.object({
        id: idSchema,
        name: nameSchema,
        clan_summary: clanSummarySchema
    }).required();

    const resultZod = clanSchema.safeParse(req.body);

    if (!resultZod.success) {
        return res.status(400).json(resultZod.error);
    } 

    try {

        const clan = await prisma.clans.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!clan) {
            return res.status(400)
            .json({ message: `O clan ${ name } não foi encontrado para edição` })
        }

        const update = await prisma.clans.update({
            where: {
                id: id
            },
            data:{ name, clan_summary }
        })

        res.status(200)
        .json(update)
    } catch (error) {
        res.status(500)
        .json({ message: `Ocorreu um problema ao atualizar o clan ${name}` })
    }
}

export const remove = async (req: Request, res: Response) => {

    const { id } = req.body

    const clanSchema = z
      .object({
        id: idSchema,
      })
      .required();

    const resultZod = clanSchema.safeParse(req.body);

    if (!resultZod.success) {
      return res.status(400).json(resultZod.error);
    } 

    try {

        const clan = await prisma.clans.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!clan) {
            return res.status(400)
            .json({ message: `Não foi possivel deletar o clan` })
        }

        await prisma.clans.delete({
            where: {
                id: id,
            },
        })

        res.status(200)
        .json({})
    } catch (error) {
        res.status(500)
        .json({ message: `Ocorreu um problema ao deletar o clan` })
    }
}