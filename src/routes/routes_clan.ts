import { PrismaClient } from "@prisma/client"
import { Router, Request, Response } from "express"

const router = Router()
const prisma = new PrismaClient()

router.get('/:id?', async (req: Request, res: Response) => {

    let id: any|null = req.query.id ?? null
    let clan = null

    try {
        if (req.query.id) {
            clan = await prisma.clans.findUnique({
                where: {
                    id: parseInt(id)
                }
            })
        } else {
            clan = await prisma.clans.findMany()
        }

        res.status(200)
        .json(clan)

    } catch (error) {
        res.status(500)
        .json({
            message: 'Ocorreu um problema ao buscar o clan informado'
        })
    }

})

router.post('/', async (req: Request, res: Response) => {

    const data = req.body

    if (!data.name) {
        res.status(400)
        .json({
            message: 'O parametro name é obrigatório'
        })
    }

    if (!data.clan_summary) {
        res.status(400)
        .json({
            message: 'O parametro clan_summary é obrigatório'
        })
    }

    try {
        const clan = await prisma.clans.create({ data })
        res.status(201).json(clan)
    } catch (error) {
        res.status(500).json({
            message: 'Ocorreu um problema ao criar um novo clan'
        })
    }
})

router.put('/', async(req: Request, res: Response)=>{

    const { id, name, clan_summary } = req.body

    try {

        const clan = await prisma.clans.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!clan) {
            res.status(400)
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
})

router.delete('/', async (req: Request, res: Response) => {

    const { id } = req.body

    try {

        const clan = await prisma.clans.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!clan) {
            res.status(400)
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
})

export default router