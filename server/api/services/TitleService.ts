import { where } from "sequelize";
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

export function createTitle(titleJSON: {desc: string, name: string, requirements: string}){
    const newTitle = Title.build(titleJSON)
    return newTitle.save().catch(generateErrorJSON)
}

export async function getTitles(params:{limit: number, page: number}|undefined) {
    if(typeof params === 'undefined')
        return Title.findAll().catch(generateErrorJSON)
    
    try{
        const titleAmount = await Title.count()

        const totalPages = Math.ceil(titleAmount/params.limit)

        const rows = await Title.findAll({
            limit: params.limit,
            offset: (params.page-1) * params.limit,
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

export function getTitle(id:number) {
    return Title.findByPk(id).catch(generateErrorJSON)
}

export function updateTitle(id:number, titleJSON:{desc?:string, name?:string, requirements?:string}){
    return Title.update(titleJSON, {
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}

export function deleteTitle(id:number){
    return Title.destroy({
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}