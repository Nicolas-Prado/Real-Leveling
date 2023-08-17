import sequelize from "../../config/sequelize"

import Character from './CharacterModel'
import Reward from './RewardModel'
import { Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey, NonAttribute, DataTypes, Association } from "sequelize";

class Task extends Model<InferAttributes<Task, {omit: 'character'}>, InferCreationAttributes<Task, {omit: 'character'}>> {
    declare id: CreationOptional<number>
    declare desc: string
    declare name: string
    declare status: string

    declare characterId: ForeignKey<Character['id']>
    declare character?: NonAttribute<Character>

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>

    declare rewards?: NonAttribute<Reward[]>

    declare static associations: {
        rewards: Association<Task, Reward>
    }
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        desc: {
            type: DataTypes.TEXT
        },
        name: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        status: {
            type: DataTypes.BOOLEAN
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'tasks',
        sequelize
    }
)

Task.hasMany(Reward, {
    sourceKey: 'id',
    foreignKey: 'taskId',
    as: 'rewards'
})

export default Task