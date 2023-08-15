import sequelize from "../../config/sequelize"

import Character from './CharacterModel'
import { Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey, NonAttribute, DataTypes, Association } from "sequelize";
import HistoryLin from "./HistoryLinModel";

class HistoryHdr extends Model<InferAttributes<HistoryHdr, {omit: 'character' | 'historyLins'}>, InferCreationAttributes<HistoryHdr, {omit: 'character' | 'historyLins'}>> {
    declare id: CreationOptional<number>
    declare synopsis: string

    declare characterId: ForeignKey<Character['id']>
    declare character?: NonAttribute<Character>

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>

    declare historyLins?: NonAttribute<Character[]>

    declare static associations: {
        historyLins: Association<HistoryHdr, HistoryLin>
    }
}

HistoryHdr.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        synopsis: {
            type: DataTypes.TEXT
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'histories_hdr',
        sequelize
    }
)

export default HistoryHdr