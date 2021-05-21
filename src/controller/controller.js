const service = require('../service/service');
const bcrypt = require('bcrypt-nodejs');



// signs in user
const signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password){
        return res.status(400).json('incorrect form submission');
    }
    let userData = {
        email: req.body.email,
        password: req.body.password
    }
    let result = await service.sign_user(userData);
    const isValid = bcrypt.compareSync(userData.password, result[0].hash_pwd);
    if (!isValid){
        return res.status(400).json('wrong credentials')
    } 
    let userValidated = await service.get_validated_user(userData.email);
    return res.json(userValidated);
}

// register user
const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !name || !password){
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    let userData = {
        name, email, hash
    }
    let result = await service.register_user(userData);
    if(result){
        return res.json(result[0]);
    } else {
        return res.status(400).json('unable to register');
    }
}

// get a single user
const get_user = async (req, res) => {
    const { id } = req.params;
    let result = await service.get_user(id);
    if (result !== undefined){
        return res.json(result);
    } else {
        return res.status(400).json('user not found');
    }
}

const update = async (req, res) => {
    const { id } = req.body;
    let result = await service.update_user(id);
    if (result){
        res.json(result);
    } else {
        res.status(404).json(result);
    }
}

module.exports = {
    signin, register, get_user, update
}