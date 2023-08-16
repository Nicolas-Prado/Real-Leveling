import { where } from "sequelize";
import Bond from "../models/BondModel";

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

export function createBond(bondJSON: {desc:string, type:string}){
    const newBond = Bond.build(bondJSON)
    return newBond.save().catch(generateErrorJSON)
}

export async function getBonds(params:{limit: number, page: number}|undefined) {
    if(typeof params === 'undefined')
        return Bond.findAll().catch(generateErrorJSON)
    
    try{
        const bondAmount = await Bond.count()

        const totalPages = Math.ceil(bondAmount/params.limit)

        const rows = await Bond.findAll({
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

export function getBond(id:number) {
    return Bond.findByPk(id).catch(generateErrorJSON)
}

export function updateBond(id:number, bondJSON:{desc?:string, type?:string}){
    return Bond.update(bondJSON, {
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}

export function deleteBond(id:number){
    return Bond.destroy({
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}