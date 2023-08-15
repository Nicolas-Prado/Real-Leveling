import User from "./UserModel";
import Character from "./CharacterModel";

//Associations
/*User.hasMany(Character, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'characters'
})*/

User.sync({alter: true})
Character.sync({alter: true})
