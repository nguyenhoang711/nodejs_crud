const { Op } = require('sequelize');
const db = require('../_helpers/db');
const bcrypt = require('bcrypt');

module.exports = {
    getAll,
    getAllByParams,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Account.findAll();
}

async function getAllByParams(params) {
    return await db.Account.findAll(
        {
            where: {
                [Op.or]: [
                    {username: {[Op.substring]: params.username}},
                    {firstName: {[Op.substring]: params.fullName}},
                    {lastName: {[Op.substring]: params.fullName}},
                    {email: {[Op.substring]: params.email}}
                ]
            },
            include: [
                {
                    model: db.Department,
                    attributes: ['name']
                }
            ],
        }
    );
}

async function getById(id) {
    return await getAccount(id);
}

async function create(params) {
    // validate
    const dep = await findByDepName(params.depName);
    if(!dep) throw new Error(`Department ${params.depName} was not found`);
    const data = await db.Account.findAll({ 
        where: {
            [Op.or]:[
                {username: params.username},
                {email: params.email}
            ]
        }
    });

    if (data.length != 0) throw new Error(`Account username or email is already registered`);

    //toan tu spread
    const account = db.Account.build({...params, departmentId: dep.id});

    // hash password
    // account.passwordHash = await bcrypt.hash(params.password, 10);
    account.passwordHash = await bcrypt.genSalt(10).then((salt) => bcrypt.hash(params.password, salt));
    console.log(account.passwordHash);
    // save Account
    await account.save();
}

async function update(id, params) {
    const account = await getAccount(id);

    // validate
    const depNameChanged = params.username && account.username !== params.username;
    if (depNameChanged && await db.Account.findOne({ where: { username: params.username } })) {
        throw new Error('Account username "' + params.username + '" is already taken');
    }

    // copy params to account and save
    Object.assign(account, params);
    //lưu lại vào db
    await account.save();
}

async function _delete(id) {
    const user = await getAccount(id);
    if(!user) throw new Error(`Account with id = ${id} does not exist`);
    //xóa user lấy ra theo ID
    await user.destroy();
}

// helper functions

async function getAccount(id) {
    const account = await db.Account.findByPk(id);
    if (!account) throw new Error(`Account with id = ${id} not found`);
    return account;
}

async function findByDepName(name) {
    return await db.Department.findOne({
        where: {name: name}
    });
}