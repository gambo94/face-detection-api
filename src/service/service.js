// MODELS & DB

const db = require('../config/config');



const get_validated_user = async (email) => {
    try {
        let userSelected = await db.select('*')
        .from('users')
        .where({email});
        return userSelected[0];
    } catch (error) {
        return(error);
    }
}

const sign_user = async (userData) => {
    let data = await db.select('hash_pwd', 'email')
    .from('signin')
    .where('email', '=', userData.email);
    return data;
}

const register_user = (userData) => {
        return db.transaction(trx => {
            trx.insert({
                hash_pwd: userData.hash,
                email: userData.email
            })
            .into('signin')
            .then(result => {
                return db('users')
                .insert({
                    email: userData.email,
                    name: userData.name,
                    signup_date: new Date()
                })
                .then(id => {
                    return db.select('*')
                        .from('users')
                        .where({id});
                })
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .catch(error => console.log('unable to register'));
}

const get_user = async (id) => {
    try {
        let userSelected = await db.select('*')
        .from('users')
        .where({id});
        return userSelected[0];
    } catch (error) {
        return(error);
    }
}


const update_user = async (id) => {
    try {
        let result = await db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        let entries = await db('users')
        .where('id', id)
        .select('entries')
        return entries[0].entries;
    } catch (error) {
        return 'user not found';
    }
}

module.exports = {
    sign_user, register_user, get_user,
    update_user, get_validated_user
}