import { 
    Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, 
    Association, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManySetAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin 
} from 'sequelize'
import sequelize from '../../config/sequelize'

import Character from './CharacterModel'

class User extends Model<InferAttributes<User, { omit: 'characters' }>, InferCreationAttributes<User, { omit: 'characters' }>> {
    declare id: CreationOptional<number>
    declare username: string
    declare password: string

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>

    declare getCharacters: HasManyGetAssociationsMixin<Character>; // Note the null assertions!
    declare addCharacter: HasManyAddAssociationMixin<Character, number>;
    declare addCharacters: HasManyAddAssociationsMixin<Character, number>;
    declare setCharacters: HasManySetAssociationsMixin<Character, number>;
    declare removeCharacter: HasManyRemoveAssociationMixin<Character, number>;
    declare removeCharacters: HasManyRemoveAssociationsMixin<Character, number>;
    declare hasCharacter: HasManyHasAssociationMixin<Character, number>;
    declare hasCharacters: HasManyHasAssociationsMixin<Character, number>;
    declare countCharacters: HasManyCountAssociationsMixin;
    declare createCharacter: HasManyCreateAssociationMixin<Character, 'userId'>;

    declare characters?: NonAttribute<Character[]>

    declare static associations: {
        characters: Association<User, Character>
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: new DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: new DataTypes.STRING(100),
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    { 
        tableName: 'users',
        sequelize
    }
)

User.hasMany(Character, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'characters'
})

export default User