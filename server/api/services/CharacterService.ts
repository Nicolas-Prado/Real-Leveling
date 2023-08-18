import { where } from "sequelize";
import { Request, Response } from "express"
import upload from "./../../config/multer"
import Character from "../models/CharacterModel";
import Title from "../models/TitleModel";

function generateErrorJSON(err:any){
    const errorJSON = {
        error: {
            type: err.constructor.name,
            field: err.errors?.map((error:any) => error.path),
            message: err.parent?.sqlMessage || err.errors?.map((error:any) => error.message)
        }
    }

    return errorJSON
}

export function createCharacter(characterJSON: {name: string, bornDate: string, imagePath?: string}){
    const newCharacter = Character.build(characterJSON)
    return newCharacter.save().catch(generateErrorJSON)
}

export async function improvedCreateCharacter(req:Request, res:Response){
    return new Promise<{ character: {},  title: {}, history: {} } | {error:{type:string, field:any[], message:string|any[]}}>(async (resolve, reject) => {
        upload.single('image')(req, res, async function (err) {
            if (err)
                resolve ({
                    error: {
                        type: "Upload error",
                        field: ["image"],
                        message: "Error in the process of image upload"
                    }
                })

            try{
                const { body } = req
        
                const newCharacter = await Character.create({
                    name: body.name,
                    bornDate: body.bornDate,
                    userId: body.userId,
                    imagePath: req.file?.path
                })
        
                const newTitle = await newCharacter.createTitle({
                    desc: body.titleDesc,
                    name: body.titleName,
                    requirements: body.titleRequirements,
                    inUse: true
                })
        
                const newHistoryHdr = await newCharacter.createHistoryHdr({
                    synopsis: body.synopsis
                })
        
                resolve({ character: newCharacter,  title: newTitle, history: newHistoryHdr })
            } catch (err:any) {
                resolve(generateErrorJSON(err))
            }
        })
    })
}

export async function getCharacters(params:{limit: number, page: number, userid?: number}|undefined) {
    if(typeof params === 'undefined')
        return Character.findAll().catch(generateErrorJSON)
    
    try{
        const characterAmount = await Character.count()

        const totalPages = Math.ceil(characterAmount/params.limit)

        const rows = await Character.findAll({
            limit: params.limit,
            offset: (params.page-1) * params.limit,
            where: {
                ...params.userid ? { userid: params.userid } : {},
            }
        })

        const responseBody = {
            results: rows,
            totalPages: totalPages,
            currentPage: params.page
        }

        return responseBody

    } catch (err:any) {
        return generateErrorJSON(err)
    }
}

export async function getCharactersWithTitleAndLevel(params:{limit: number, page: number, userId?: number}|undefined) {
    if(typeof params === 'undefined'){
        return Character.findAll({
            include: [{
                model: Title,
                as: 'titles',
                required: true,
                where: { inUse: 1 }
            }]
        }).catch(generateErrorJSON)
    }
    
    try{
        const characterAmount = await Character.count()

        const totalPages = Math.ceil(characterAmount/params.limit)

        let rows = await Character.findAll({
            limit: params.limit,
            offset: (params.page-1) * params.limit,
            include: [{
                model: Title,
                as: 'titles',
                required: true,
                where: { inUse: 1 }
            }],
            where: {
                ...params.userId ? { userId: params.userId } : {},
            }
        })

        const responseBody = {
            results: rows,
            totalPages: totalPages,
            currentPage: params.page
        }

        return responseBody

    } catch (err:any) {
        return generateErrorJSON(err)
    }
}

export function getCharacter(id:number) {
    return Character.findByPk(id).catch(generateErrorJSON)
}

export function updateCharacter(id:number, characterJSON:{name?:string, age?:number}){
    return Character.update(characterJSON, {
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}

export function deleteCharacter(id:number){
    return Character.destroy({
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}