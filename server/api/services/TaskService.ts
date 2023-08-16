import { where } from "sequelize";
import Task from "../models/TaskModel";

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

export function createTask(taskJSON: {desc:string, name:string, status:string}){
    const newTask = Task.build(taskJSON)
    return newTask.save().catch(generateErrorJSON)
}

export async function getTasks(params:{limit: number, page: number}|undefined) {
    if(typeof params === 'undefined')
        return Task.findAll().catch(generateErrorJSON)
    
    try{
        const taskAmount = await Task.count()

        const totalPages = Math.ceil(taskAmount/params.limit)

        const rows = await Task.findAll({
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

export function getTask(id:number) {
    return Task.findByPk(id).catch(generateErrorJSON)
}

export function updateTask(id:number, taskJSON:{desc?:string, name?:string, status?:string}){
    return Task.update(taskJSON, {
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}

export function deleteTask(id:number){
    return Task.destroy({
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}