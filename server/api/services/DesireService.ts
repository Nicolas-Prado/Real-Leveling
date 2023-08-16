import { where } from "sequelize";
import Desire from "../models/DesireModel";

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

export function createDesire(desireJSON: {desc:string, name:string, status:string}){
    const newDesire = Desire.build(desireJSON)
    return newDesire.save().catch(generateErrorJSON)
}

export async function getDesires(params:{limit: number, page: number}|undefined) {
    if(typeof params === 'undefined')
        return Desire.findAll().catch(generateErrorJSON)
    
    try{
        const desireAmount = await Desire.count()

        const totalPages = Math.ceil(desireAmount/params.limit)

        const rows = await Desire.findAll({
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

export function getDesire(id:number) {
    return Desire.findByPk(id).catch(generateErrorJSON)
}

export function updateDesire(id:number, desireJSON:{desc?:string, name?:string, status?:string}){
    return Desire.update(desireJSON, {
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}

export function deleteDesire(id:number){
    return Desire.destroy({
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}