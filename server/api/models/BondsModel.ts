import sequelize from "../../config/sequelize";

import Character from './CharacterModel'
import { Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey, NonAttribute, DataTypes } from "sequelize";

class Bond extends Model<InferAttributes<Bond, {omit: 'protagonist' | 'company'}>, InferCreationAttributes<Bond, {omit: 'protagonist' | 'company'}>> {
    declare id: CreationOptional<number>
    declare desc: string
    declare type: string

    declare protagonistId: ForeignKey<Character['id']>
    declare protagonist?: NonAttribute<Character>

    declare companyId: ForeignKey<Character['id']>
    declare company?: NonAttribute<Character>

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Bond.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        desc: {
            type: DataTypes.TEXT
        },
        type: {
            type: new DataTypes.STRING(255),
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'bonds',
        sequelize
    }
)

export default Bond