const COMPANY = require("../model/company");
const COMPANY_ROOM = require("../model/companyRoom");
const ADMIN = require("../model/admin");
const BCRYPT = require('bcrypt');
const JWT = require("jsonwebtoken");
const SALT_ROUNDS = 10;

//get all companies func
exports.companyGetALL = (req, res, next) => {
    COMPANY.findAll().then((companies) => {
        if (companies) {
            console.log("From database: ", companies);
            res.status(200).json({
                message: "Companies find successfuly!",
                companies: companies
            });
        } else {
            res.status(404).json({ message: "No valid entry found for provided ID" });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}

exports.companyGetCompanyRooms = (req, res, next) => {
    const ID_COMPANY = req.params.id;
    companyGetCompanyRoomsAsync(req, res, next, ID_COMPANY);
}

async function companyGetCompanyRoomsAsync(req,res,next, ID_COMPANY){

    let companyRoomGetAll = new Promise((resolve, reject) => {
        COMPANY_ROOM.findAll({where: {idCompany: ID_COMPANY}}).then((companyRooms) => {
            if (companyRooms) {
               resolve(companyRooms);
            } else {
               res.status(404).json({ message: "No valid entry found for provided ID" });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    });

    let companyRoomsArray = await companyRoomGetAll;
    var resultArray = [];
    for(let i = 0; i < companyRoomsArray.length; i++){
        console.log("For: " + companyRoomsArray[i])
        let currentRoomUsers = await getRoomUsers(companyRoomsArray[i].id);
        resultArray[i] = currentRoomUsers;
    }

    if(resultArray.length != companyRoomsArray.length){
        res.status(409).json({
            error: "Не удалось найти!"
        });
    } else {
        res.status(200).json({
            message: "CompanyRooms find successfuly!",
            companyRooms: companyRoomsArray,
            roomUsers: resultArray
        });
    }

    async function getRoomUsers(id){
        let cycleGetUsers = new Promise((resolve, reject) => {
            console.log("Sql ручная: " + id)
            const query = "SELECT `companyroomcontracts`.`idUser`, `users`.`fullName` FROM `users`, `companyroomcontracts` WHERE `users`.`id` = `companyroomcontracts`.`idUser` AND `companyroomcontracts`.`idCompanyRoom` = " + id;
            sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
                .then(users => {
                    console.log("Sql внутри: " + id)
                    resolve(users);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err });
                })
        });
        return await cycleGetUsers;   
    }

    
    
}

//get info about one company
exports.companyGetInfoAboutOne = (req, res, next) => {
    const ID = req.params.id;
    COMPANY.findByPk(ID).then((company) => {
        if (company) {
            console.log("From database: ", company);
            res.status(200).json({
                message: "Company find successfuly!",
                company: company
            });
        } else {
            res.status(404).json({ message: "No valid entry found for provided ID" });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}

//company login
exports.companyLogin = (req, res, next) => {
    const EMAIL = req.body.email;
    const PASSWORD = req.body.password;
    ADMIN.findAll({ where: { email: EMAIL }, raw: true })
        .then(admin => {
            if (admin.length < 1) {
                COMPANY.findAll({ where: { email: EMAIL }, raw: true })
                    .then(company => {
                        if (company.length < 1) {
                            return res.status(401).json({
                                message: "Auth failed"
                            });
                        }
                        BCRYPT.compare(PASSWORD, company[0].password, (err, result) => {
                            if (err) {
                                return res.status(401).json({
                                    message: "Auth failed"
                                });
                            }
                            if (result) {
                                const TOKEN = JWT.sign({ company }, "secret", { expiresIn: '1h' });
                                return res.status(200).json({
                                    message: "Auth successful",
                                    token: TOKEN,
                                    name: company[0].name,
                                    id: company[0].id,
                                    typeCompany: company[0].typeCompany,
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

//company update info func
exports.companyUpdateInfoAboutOne = (req, res, next) => {
    const ID = req.params.id;

    let nameChanged = req.body.name;
    let typeCompanyChanged = req.body.typeCompany;

    if (nameChanged != null && nameChanged != undefined && nameChanged != "" && nameChanged != " ") {
        COMPANY.update({ name: nameChanged }, { where: { id: ID } })
            .then(() => {
                next();
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            })
    }
    if (typeCompanyChanged != null && typeCompanyChanged != undefined && typeCompanyChanged != "" && typeCompanyChanged != " ") {
        COMPANY.update({ typeCompany: typeCompanyChanged }, { where: { id: ID } })
            .then(() => {
                next();
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            })
    }
    if ((nameChanged == null || nameChanged == undefined) && (typeCompanyChanged == null || typeCompanyChanged == undefined)) {
        return res.status(401).json({
            message: "Your fields are empty",
        });
    }
    return res.status(200).json({
        message: "Successful update. ZAEBUMBA!",
    });
}

//company sign up func
exports.companySignUp = (req, res, next) => {
    const NAME = req.body.name;
    const PASSWORD = req.body.password;
    const EMAIL = req.body.email;
    const TYPE_COMPANY = req.body.typeCompany;

    COMPANY.findAll({ where: { email: EMAIL }, raw: true })
        .then(company => {
            if (company.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                BCRYPT.hash(PASSWORD, SALT_ROUNDS, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    } else {
                        COMPANY.create({
                            name: NAME,
                            email: EMAIL,
                            typeCompany: TYPE_COMPANY,
                            password: hash
                        }).then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: "Company created!",
                                request: {
                                    type: "POST",
                                    url: "http://localhost:3000/company/" + result.id,
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

//company delete func
exports.companyDeleteOne = (req, res, next) => {
    const id = req.params.id;
    COMPANY.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).json({
            message: "Company №" + id + " was deleted",
            request: {
                type: "DELETE",
                url: "http://localhost:3000/company",
                body: { name: "STRING", email: "STRING", password: "STRING" }
            }
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}