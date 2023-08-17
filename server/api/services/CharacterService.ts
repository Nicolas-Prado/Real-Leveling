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
    try { 
        //Image upload
        upload.single('image')(req, res, async function errorLaucher(err:string|any) {
            if (err){
                console.log('sus')
                return {
                    error: {
                        type: "Upload error",
                        field: "Image",
                        message: "Error in the process of image upload"
                    }
                }
            }
        })

        const { body } = req

        console.log(body.name, body.bornDate, body.userId, body.imagePath, body.desc, body.name, body.requirements, body.imagePath)

        const newCharacter = await Character.create({
            name: "Worcnaaafafwdzzz",
            bornDate: "2004-12-28",
            userId: 1,
            imagePath: "sdwwaafawfawfadusss"
        })

        const newTitle = newCharacter.createTitle({
            desc: "May the weakawfawawdest turn into the strongest one",
            name: "The weakestaawfwawd one",
            requirements: "Enter fwafinawd the real leveling",
            inUse: true
        })

        const newHistoryHdr = newCharacter.createHistoryHdr({
            synopsis: "susawdasdds"
        })

        return { character: newCharacter,  title: newTitle, history: newHistoryHdr}

    }catch (err:any) {
        if(err.error)
            return err
        console.log(err)
        return generateErrorJSON(err)
    }
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

export async function getCharactersWithTitleAndLevel(params:{limit: number, page: number, userid?: number}|undefined) {
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
                ...params.userid ? { userId: params.userid } : {},
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