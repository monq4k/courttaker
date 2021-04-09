const USER = require("../model/user");
const BCRYPT = require('bcrypt');
const JWT = require("jsonwebtoken");
const SALT_ROUNDS = 10;

//get all users from db func
exports.userGetAll = (req, res, next) => {
    USER.findAll().then((users) => {
        if (users) {
            console.log("From database: ", users);
            res.status(200).json({
                message: "User find successfuly!",
                users: users
            });
        } else {
            res.status(404).json({ message: "No valid entry found for provided ID" });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}

//user get infro about one by id
exports.userGetInfoAboutOne = (req, res, next) => {
    const ID = req.params.id;
    USER.findByPk(ID).then((user) => {
        if (user) {
            console.log("From database: ", user);
            res.status(200).json({
                message: "User find successfuly!",
                user: user
            });
        } else {
            res.status(404).json({ message: "No valid entry found for provided ID" });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}
//multirequest and example of request from
// exports.connections_get_all = (req, res, next) => {
//     const idUser = req.params.idUser;
//     const query = "SELECT `connections`.`id`, `connections`.`name`, `connections`.`place`, `connections`.`time_begin`,`connections`.`time_duration`, `connections`.`time_end`,`connections`.`number_of_users`, `connections`.`type_connection`, `connections`.`status` FROM `connections`, `connectioncontracts` WHERE `connections`.`id` = `connectioncontracts`.`connectionId` AND `connectioncontracts`.`userId` = " + idUser;
//     sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
//         .then(connections => {
//             return res.status(200).json(connections);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err });
//         })
// }

//user auth func
exports.userLogin = (req, res, next) => {
    const EMAIL = req.body.email;
    const PASSWORD = req.body.password;
    ADMIN.findAll({ where: { email: EMAIL }, raw: true })
        .then(admin => {
            if (admin.length < 1) {
                USER.findAll({ where: { email: EMAIL }, raw: true })
                    .then(user => {
                        if (user.length < 1) {
                            return res.status(401).json({
                                message: "Auth failed"
                            });
                        }
                        BCRYPT.compare(PASSWORD, user[0].password, (err, result) => {
                            if (err) {
                                return res.status(401).json({
                                    message: "Auth failed"
                                });
                            }
                            if (result) {
                                const TOKEN = JWT.sign({ user }, "secret", { expiresIn: '1h' });
                                return res.status(200).json({
                                    message: "Auth successful",
                                    token: TOKEN,
                                    name: user[0].name,
                                    id: user[0].id
                                })
                            }
                            res.status(401).json({
                                message: "Auth failed"
                            })
                        });
                    }).catch(err => {
                        console.log(err);
                        res.status(409).json({ error: err, message: "Invalid email mb" });
                    });
            } else {
                BCRYPT.compare(PASSWORD, admin[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth admin failed"
                        });
                    }
                    if (result) {
                        return res.status(200).json({
                            message: "Admin auth successful",
                            adminKey: admin[0].adminKey
                        })
                    }
                    res.status(401).json({
                        message: "Admin auth failed"
                    })
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}

//user update info about one func
exports.userUpdateInfo = (req, res, next) => {
            const ID = req.params.id;

            let fullNameChanged = req.body.fullName;
            let temperamentChanged = req.body.temperament;
            let typeCharacterChanged = req.body.typeCharacter;

            if (temperamentChanged != null && temperamentChanged != undefined && temperamentChanged != "" && temperamentChanged != " ") {
                USER.update({ temperament: temperamentChanged }, { where: { id: ID } })
                    .then(() => {
                        next();
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: err });
                    })
            }
            if (fullNameChanged != null && fullNameChanged != undefined && fullNameChanged != "" && fullNameChanged != " ") {
                USER.update({ fullName: fullNameChanged }, { where: { id: ID } })
                    .then(() => {
                        next();
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: err });
                    })
            }
            if (typeCharacterChanged != null && typeCharacterChanged != undefined && typeCharacterChanged != "" && typeCharacterChanged != " ") {
                USER.update({ typeCharacter: typeCharacterChanged }, { where: { id: ID } })
                    .then(() => {
                        next();
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: err });
                    })
            }
            if ((temperamentChanged == null || temperamentChanged == undefined) && (fullNameChanged == null || fullNameChanged == undefined) && (typeCharacterChanged == null || typeCharacterChanged == undefined)) {
                return res.status(401).json({
                    message: "Your fields are empty",
                });
            }
            return res.status(200).json({
                message: "Successful update. ZAEBUMBA!",
            });
}

//user sign up func
exports.userSignUp = (req, res, next) => {
    const FULL_NAME = req.body.fullName;
    const PASSWORD = req.body.password;
    const EMAIL = req.body.email;

    USER.findAll({ where: { email: EMAIL }, raw: true })
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                BCRYPT.hash(PASSWORD, SALT_ROUNDS, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    } else {
                        USER.create({
                            fullName: FULL_NAME,
                            email: EMAIL,
                            temperament: "",
                            typeCharacter: "",
                            password: hash
                        }).then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: "User created!",
                                request: {
                                    type: "POST",
                                    url: "http://localhost:3000/user/" + result.id,
                                    body: { name: "STRING", email: "STRING", password: "STRING" }
                                }
                            });
                        }
                        ).catch(err => {
                            console.log(err);
                            res.status(500).json({ error: err });
                        });
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}

//user delete one func
exports.userDeleteOne = (req, res, next) => {
    const ID = req.params.id;
    USER.destroy({
        where: { id: ID }
    }).then(() => {
        res.status(200).json({
            message: "User №" + ID + " was deleted",
            request: {
                type: "POST",
                url: "http://localhost:3000/user",
                body: { name: "STRING", email: "STRING", password: "STRING" }
            }
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}