import sequelize from "../../config/sequelize"

import Character from './CharacterModel'
import { Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey, NonAttribute, DataTypes } from "sequelize";

class Title extends Model<InferAttributes<Title, {omit: 'character'}>, InferCreationAttributes<Title, {omit: 'character'}>> {
    declare id: CreationOptional<number>
    declare desc: string
    declare name: string
    declare requirements: string
    declare inUse: boolean

    declare characterId: ForeignKey<Character['id']>
    declare character?: NonAttribute<Character>

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Title.init(
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
        requirements: {
            type: DataTypes.TEXT
        },
        inUse: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'titles',
        sequelize
    }
)

export default Title