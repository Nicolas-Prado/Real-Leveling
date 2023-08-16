import sequelize from "../../config/sequelize";

import Character from './CharacterModel'
import { Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey, NonAttribute, DataTypes } from "sequelize";

class Configuration extends Model<InferAttributes<Configuration, {omit: 'character'}>, InferCreationAttributes<Configuration, {omit: 'character'}>> {
    declare id: CreationOptional<number>

    declare characterId: ForeignKey<Character['id']>
    declare character?: NonAttribute<Character>

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Configuration.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'configurations',
        sequelize
    }
)

export default Configuration