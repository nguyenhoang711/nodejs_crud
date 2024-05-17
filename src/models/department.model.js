const { DataTypes } = require('sequelize');
const db = require('../_helpers/db');
const { NAME } = require('../_helpers/reg');
module.exports = model;

function model(sequelize) {// We need to pass the connection instance: sequelize
    const attributes = {
        id: {type: DataTypes.TINYINT, autoIncrement: true, primaryKey: true},
        name: {type: DataTypes.STRING,allowNull: false,unique: true,},
    };

    const options = {
        freezeTableName: true,
        timestamps: false
    }
    
    return sequelize.define('department', attributes, options);
}

