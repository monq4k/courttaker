const COMPANY_ROOM = require("../model/companyRoom");
const ADMIN = require("../model/admin");
const BCRYPT = require('bcrypt');
const JWT = require("jsonwebtoken");
const SALT_ROUNDS = 10;

//get all companyRooms func
exports.companyRoomGetALL = (req, res, next) => {
    COMPANY_ROOM.findAll().then((companyRooms) => {
        if (companyRooms) {
            console.log("From database: ", companyRooms);
            res.status(200).json({
                message: "CompanyRooms find successfuly!",
                companyRooms: companyRooms
            });
        } else {
            res.status(404).json({ message: "No valid entry found for provided ID" });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}

//get info about one companyRoom
exports.companyRoomGetInfoAboutOne = (req, res, next) => {
    const ID = req.params.id;
    COMPANY_ROOM.findByPk(ID).then((companyRoom) => {
        if (companyRoom) {
            console.log("From database: ", companyRoom);
            res.status(200).json({
                message: "CompanyRoom find successfuly!",
                companyRoom: companyRoom
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
exports.companyRoomGetUsers = (req, res, next) => {
    const idCompanyRoom = req.params.id;
    const query = "SELECT `companyroomcontracts`.`idUser`, `users`.`fullName` FROM `users`, `companyroomcontracts` WHERE `users`.`id` = `companyroomcontracts`.`idUser` AND `companyroomcontracts`.`idCompanyRoom` = " + idCompanyRoom;
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
        .then(connections => {
            return res.status(200).json(connections);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}

//companyRoom update info func
exports.companyRoomUpdateInfoAboutOne = (req, res, next) => {
    const ID = req.params.id;

    let numberOfUsersChanged = req.body.numberOfUsers;

    if (numberOfUsersChanged != null && numberOfUsersChanged != undefined && numberOfUsersChanged != "" && numberOfUsersChanged != " ") {
        COMPANY_ROOM.update({ numberOfUsers: numberOfUsersChanged }, { where: { id: ID } })
            .then(() => {
                next();
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            })
    }
    
    if ((numberOfUsersChanged == null && numberOfUsersChanged == undefined)) {
        return res.status(401).json({
            message: "Your fields are empty",
        });
    }
    return res.status(200).json({
        message: "Successful update. ZAEBUMBA!",
    });
}

//companyRoom create func
exports.companyRoomCreate = (req, res, next) => {
    const ID_COMPANY = req.body.idCompany;
    const PASSWORD = req.body.password;

    BCRYPT.hash(PASSWORD, SALT_ROUNDS, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: err });
        } else {
            COMPANY_ROOM.create({
                password: hash,
                idCompany: ID_COMPANY,
                numberOfUsers: 0
            }).then(result => {
                console.log(result);
                res.status(201).json({
                    message: "CompanyRoom created!",
                    request: {
                        type: "POST",
                        url: "http://localhost:3000/companyRoom/" + result.id,
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

//companyRoom delete func
exports.companyRoomDeleteOne = (req, res, next) => {
    const id = req.params.id;
    COMPANY_ROOM.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).json({
            message: "CompanyRoom №" + id + " was deleted",
            request: {
                type: "DELETE",
                url: "http://localhost:3000/companyRoom",
                body: { name: "STRING", email: "STRING", password: "STRING" }
            }
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}