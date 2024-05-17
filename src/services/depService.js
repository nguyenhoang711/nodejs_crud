const { Op } = require('sequelize');
const db = require('../_helpers/db');

module.exports = {
    getAll,
    getByParams,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Department.findAll(
        {attributes: 
            {exclude: ['id']}
        }
    );
}

async function getByParams(params) {
    const dep =  db.Department.findAll({
        where: {name: {[Op.substring]: params.name}},
        attributes: ['name']
    });

    if(!dep) throw new Error(`department with name = ${params.name} not found`);
    return dep;
}


async function create(params) {
    // validate
    const data = await db.Department.findAll({ where: { name: params.name } });
    if (data.length != 0) {
        throw new Error(`Department name '${params.name}' is already registered`);
    }

    //kết quả trả về của hàm model(sequelize)
    const department = new db.Department(params);

    // save Department
    await department.save();
}

async function update(id, params) {
    const department = await getDepartment(id);
    if(!department) throw new Error('Department not found');
    console.log('Department update: ', department);

    // validate
    const depNameChanged = params.name && department.name !== params.name;
    if (depNameChanged && await db.Department.findOne({ where: { name: params.name } })) {
        throw new Error('Department name "' + params.name + '" is already taken');
    }

    // copy params to department and save
    Object.assign(department, params);
    //lưu lại vào db
    await department.save();
}

async function _delete(name) {
    const user = await db.Department.findOne({where: {name: name}});
    if(!user) throw new Error(`Cannot find department ${name}`);

    //xóa user lấy ra theo name
    await user.destroy();
}

// helper functions

async function getDepartment(id) {
    const department = await db.Department.findByPk(id);
    console.log(department);
    if (!department) throw new Error('Department not found');
    return department;
}