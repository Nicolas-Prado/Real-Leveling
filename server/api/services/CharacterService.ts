import { where } from "sequelize";
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

export function createCharacter(characterJSON: {name: string, age: number}){
    const newCharacter = Character.build(characterJSON)
    return newCharacter.save().catch(generateErrorJSON)
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