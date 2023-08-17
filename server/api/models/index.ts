import * as dotenv from "dotenv";
dotenv.config();

import sequelize from "../../config/sequelize";

import User from "./UserModel";
import Character from "./CharacterModel";
import Configuration from "./ConfigurationModel";
import Title from "./TitleModel";
import HistoryHdr from "./HistoryHdrModel";
import HistoryLin from "./HistoryLinModel";
import Bond from "./BondModel";
import Desire from "./DesireModel";
import Task from "./TaskModel";

/* Associations
User.hasMany(Character, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'characters'
})
*/

//Character.belongsTo(User, { targetKey: 'id' });

/* Syncs*/
//sequelize.sync({ force: true })
User.sync({alter: true})
Character.sync({alter: true})
Configuration.sync({alter: true})
Title.sync({alter: true})
HistoryHdr.sync({alter: true})
Bond.sync({alter: true})
Desire.sync({alter: true})
Task.sync({alter: true})
HistoryLin.sync({alter: true})

