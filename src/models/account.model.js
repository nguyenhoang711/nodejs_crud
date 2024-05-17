const { DataTypes, Sequelize } = require('sequelize');
const db = require('../_helpers/db');
const { STATUS } = require('../_helpers/enum');
module.exports = model;

//converter enum value
const statusConverter = (value) => {
    switch (value) {
        case 0: return 'NOT_ACTIVE';
        case 1: return 'ACTIVE';
        default:
            throw `Invalid value: ${value}`;
    }

}
function model(sequelize) {// We need to pass the connection instance: sequelize
    const attributes = {
        id: {type: DataTypes.UUID,defaultValue: Sequelize.UUIDV4, primaryKey: true},
        email: {type: DataTypes.STRING, allowNull: false, unique: true},
        username: {type: DataTypes.STRING(50), allowNull: false, unique: true},
        passwordHash: {type: DataTypes.STRING, allowNull: false},
        firstName: {type: DataTypes.STRING(50), allowNull: false},
        lastName: {type: DataTypes.STRING(50), allowNull: false},
        fullName: {type: DataTypes.VIRTUAL,
            get() {
              return `${this.firstName} ${this.lastName}`;
            }
        },
        role: {type: DataTypes.ENUM('ADMIN', 'EMPLOYEE', 'MANAGER'), allowNull: false},
        status: {
            type: DataTypes.TINYINT.UNSIGNED, defaultValue: 0,
            get() {
                return statusConverter(this.getDataValue('status'));
            },
            set(value) {
                this.setDataValue('status', STATUS[value]);
            }
        }
    };

    const options = {
        freezeTableName: true,
        timestamps: true,
        createdAt: "createdDate",
        updatedAt: false,
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash', 'departmentId', 'createdDate','status'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };
    
    return sequelize.define('account', attributes, options);
}