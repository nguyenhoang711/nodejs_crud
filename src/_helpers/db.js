const config = require('../../config.json');
const mysql = require('mysql2/promise');
const { Sequelize, DataTypes } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    // connect to db
    const sequelize = new Sequelize(database, user, password, 
        { dialect: 'mysql',
        // see https://stackoverflow.com/questions/47367893/sequelize-reads-datetime-in-utc-only
        dialectOptions: {
            dateStrings: true,
            typeCast(field, next) {
                // for reading from database
                if (field.type === 'DATETIME') {
                    return field.string();
                }
                return next();
            }
        },
        timezone: 'Asia/Ho_Chi_Minh',}
        );

    // init models and add them to the exported db object
    //config table với class JS
    db.Department = require('../models/department.model')(sequelize);
    db.Account = require('../models/account.model')(sequelize);

    db.Department.hasMany(db.Account, {
        foreignKey: {
            type: DataTypes.TINYINT,
            allowNull: false,
            unique: true
        }
    });
    db.Account.belongsTo(db.Department);
    // sync all models with database
    //cho phép thay đổi đồng bộ với DB gốc

    await sequelize.sync({force: true}).then(() => {
        db.Department.bulkCreate([
            {
                name: 'Security'
            },
            {
                name: 'Marketing'
            },
            {
                name: 'Nhân sự'
            },
            {
                name: 'Bán hàng'
            },
            {
                name: 'Sale'
            },
            {
                name: 'Tài chính'
            }
        ])
    });
}