import sequelize from "../../config/sequelize"

import HistoryHdr from './HistoryHdrModel'
import { Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey, NonAttribute, DataTypes } from "sequelize";

class HistoryLin extends Model<InferAttributes<HistoryLin, {omit: 'historyHdr'}>, InferCreationAttributes<HistoryLin, {omit: 'historyHdr'}>> {
    declare id: CreationOptional<number>
    declare arc: string
    declare periody: string
    declare desc: string

    declare historyHdrId: ForeignKey<HistoryHdr['id']>
    declare historyHdr?: NonAttribute<HistoryHdr>

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

HistoryLin.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        arc: {
            type: new DataTypes.STRING(255),
            allowNull: false
        },
        periody: {
            type: new DataTypes.STRING(255),
            allowNull: false
        },
        desc: {
            type: DataTypes.TEXT,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'histories_lin',
        sequelize
    }
)

export default HistoryLin