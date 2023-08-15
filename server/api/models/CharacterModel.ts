import sequelize from "../../config/sequelize";
import User from './UserModel'
import { Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey, NonAttribute, DataTypes } from "sequelize";

class Character extends Model<InferAttributes<Character>, InferCreationAttributes<Character>> {
    declare id: CreationOptional<number>
    declare name: string
    declare age: number

    declare userId: ForeignKey<User['id']>
    declare user?: NonAttribute<User>

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Character.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'characters',
        sequelize
    }
)

export default Character