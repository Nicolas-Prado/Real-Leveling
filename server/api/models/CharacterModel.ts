import sequelize from "../../config/sequelize";
import Bond from "./BondModel";
import Configuration from "./ConfigurationModel";
import Desire from "./DesireModel";
import HistoryHdr from "./HistoryHdrModel";
import Task from "./TaskModel";
import Title from "./TitleModel";
import User from './UserModel'
import { Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey, NonAttribute, DataTypes, Association, HasManyCreateAssociationMixin, HasOneCreateAssociationMixin } from "sequelize";

class Character extends Model<InferAttributes<Character, { omit: 'user' }>, InferCreationAttributes<Character, { omit: 'user' }>> {
    declare id: CreationOptional<number>
    declare name: string
    declare bornDate: string
    declare imagePath: string|null

    declare userId: ForeignKey<User['id']>
    declare user?: NonAttribute<User>

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    
    declare createTitle: HasManyCreateAssociationMixin<Title, 'characterId'>;
    declare createHistoryHdr: HasOneCreateAssociationMixin<HistoryHdr>;

    declare configuration?: NonAttribute<Configuration>
    declare titles?: NonAttribute<Title[]>
    declare historyHdr?: NonAttribute<HistoryHdr>
    declare bonds?: NonAttribute<Bond[]>
    declare desires?: NonAttribute<Desire[]>
    declare tasks?: NonAttribute<Task[]>
    //declare address?: NonAttribute<Address>
    //declare roles?: NonAttribute<Role[]>

    declare public static associations: { 
        configuration: Association<Character, Configuration>
        titles: Association<Character, Title>
        historyHdr: Association<Character, HistoryHdr>
        bonds: Association<Character, Bond>
        desires: Association<Character, Desire>
        tasks: Association<Character, Task>
        //address: Association<Character, Address>
        //roles: Association<Character, Role>
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
        bornDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
                isBefore: (() => {
                    let date = new Date()
                    date.setDate(date.getDate() + 1)

                    return date.toISOString().slice(0,10)
                })()
            }
        },
        imagePath: {
            type: new DataTypes.STRING(255),
            unique: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'characters',
        sequelize
    }
)

Character.hasOne(Configuration, {
    sourceKey: 'id',
    foreignKey: 'characterId',
    as: 'configurations'
})

Character.hasMany(Title, {
    sourceKey: 'id',
    foreignKey: 'characterId',
    as: 'titles'
})

Character.hasOne(HistoryHdr, {
    sourceKey: 'id',
    foreignKey: 'characterId',
    as: 'historyHdr'
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