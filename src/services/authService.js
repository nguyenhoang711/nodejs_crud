const { Op } = require('sequelize');
const db = require('../_helpers/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendSimpleEmail } = require('./emailService');
module.exports = {
    getAccount,
    register,
    getInfo,
    activeAcc
}


async function getAccount(params) {
    // const passEncode = await bcrypt.genSalt(10).then((salt) => bcrypt.hash(params.password, salt));
    // console.log(passEncode);
    const user =  await db.Account.findOne(
        {
            where: {username: params.username},
            attributes: {
                include: ['passwordHash','id']
            }
    });
    if(user && await bcrypt.compare(params.password, user['passwordHash'])){
        //create token
        const accessToken = jwt.sign({
            userId: user.id,
            name: user.username,
            // password: user.passwordHash,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET
        ,{expiresIn: 3600});//1 hour
        
        return accessToken
    }
    else throw new Error('Username or password is not correct');
    // const validated =  await bcrypt.compare(params.password, user['passwordHash']);
    // if (validated){
    //     return 'Login success';
    // }
    // else throw new Error('Password wrong');
}

async function register(params) {
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
    // save Account
    await account.save();
    console.log(account);

    await sendSimpleEmail(account.email,'Active account','Please click into link below to active your account', `http://localhost:4100/auth/active_account/${account.id}`);
}

async function activeAcc(id) {
    const acc = await db.Account.findByPk(id);
    if(!acc) throw new Error('Account not found');
    else acc.status = 'ACTIVE';
    await acc.save();
}

async function getInfo(username) {
    return await db.Account.findOne({
        where: {username: username}
    });
}
// helper functions

async function findByDepName(name) {
    return await db.Department.findOne({
        where: {name: name}
    });
}