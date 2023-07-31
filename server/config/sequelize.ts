import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('real_leveling', 'root', 'pradopgworcnaz0', {
    host: 'localhost',
    port: 3307,
    dialect: 'mysql'
})

export = sequelize