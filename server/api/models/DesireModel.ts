import sequelize from "../../config/sequelize"

import Character from './CharacterModel'
import { Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey, NonAttribute, DataTypes } from "sequelize";

class Desire extends Model<InferAttributes<Desire, {omit: 'character'}>, InferCreationAttributes<Desire, {omit: 'character'}>> {
    declare id: CreationOptional<number>
    declare desc: string
    declare name: string
    declare status: string

    declare characterId: ForeignKey<Character['id']>
    declare character?: NonAttribute<Character>

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Desire.init(
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
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'desires',
        sequelize
    }
)

export default Desire