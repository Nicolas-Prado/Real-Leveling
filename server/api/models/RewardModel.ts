import sequelize from "../../config/sequelize"

import Task from './TaskModel'
import { Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey, NonAttribute, DataTypes } from "sequelize";

class Reward extends Model<InferAttributes<Reward, {omit: 'task'}>, InferCreationAttributes<Reward, {omit: 'task'}>> {
    declare id: CreationOptional<number>
    declare desc: string
    declare amount: number
    declare statsId: number

    declare taskId: ForeignKey<Task['id']>
    declare task?: NonAttribute<Task>

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Reward.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        desc: {
            type: DataTypes.TEXT,
            defaultValue: ""
        },
        amount: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },
        statsId: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'rewards',
        sequelize
    }
)

export default Reward