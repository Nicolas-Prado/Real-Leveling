import sequelize from "../../config/sequelize";
import Bond from "./BondModel";
import Configuration from "./ConfigurationModel";
import Desire from "./DesireModel";
import HistoryHdr from "./HistoryHdrModel";
import Task from "./TaskModel";
import Title from "./TitleModel";
import User from './UserModel'
import { Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey, NonAttribute, DataTypes, Association } from "sequelize";

class Character extends Model<InferAttributes<Character, { omit: 'user' }>, InferCreationAttributes<Character, { omit: 'user' }>> {
    declare id: CreationOptional<number>
    declare name: string
    declare age: number

    declare userId: ForeignKey<User['id']>
    declare user?: NonAttribute<User>

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>

    declare configurations?: NonAttribute<Configuration[]>
    declare titles?: NonAttribute<Title[]>
    declare historiesHdr?: NonAttribute<HistoryHdr[]>
    declare bonds?: NonAttribute<Bond[]>
    declare desires?: NonAttribute<Desire[]>
    declare tasks?: NonAttribute<Task[]>

    declare public static associations: { 
        configurations: Association<Character, Configuration>
        titles: Association<Character, Title>
        historiesHdr: Association<Character, HistoryHdr>
        bonds: Association<Character, Bond>
        desires: Association<Character, Desire>
        tasks: Association<Character, Task>
    }
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
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        age: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'characters',
        sequelize
    }
)

Character.hasMany(Configuration, {
    sourceKey: 'id',
    foreignKey: 'characterId',
    as: 'configurations'
})

Character.hasMany(Title, {
    sourceKey: 'id',
    foreignKey: 'characterId',
    as: 'titles'
})

Character.hasMany(HistoryHdr, {
    sourceKey: 'id',
    foreignKey: 'characterId',
    as: 'historiesHdr'
})

Character.hasMany(Bond, {
    sourceKey: 'id',
    foreignKey: 'characterId',
    as: 'bonds'
})

Character.hasMany(Desire, {
    sourceKey: 'id',
    foreignKey: 'characterId',
    as: 'desires'
})

Character.hasMany(Task, {
    sourceKey: 'id',
    foreignKey: 'characterId',
    as: 'tasks'
})

export default Character