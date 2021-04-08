const COMPANY_ROOM_CONTRACT = require("../model/companyRoomContract");
const ADMIN = require("../model/admin");
const COMPANY_ROOM = require("../model/companyRoom");
const BCRYPT = require('bcrypt');
const JWT = require("jsonwebtoken");
const SALT_ROUNDS = 10;

exports.companyRoomContractGetALL = (req, res, next) => {
    COMPANY_ROOM_CONTRACT.findAll().then((companyRoomContracts) => {
        if (companyRoomContracts) {
            console.log("From database: ", companyRoomContracts);
            res.status(200).json({
                message: "Company Room Contracts find successfuly!",
                companyRoomContracts: companyRoomContracts
            });
        } else {
            res.status(404).json({ message: "No valid entry found for provided ID" });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}

exports.companyRoomContractsGetInfoAboutOne = (req, res, next) => {
    const ID = req.params.id;
    COMPANY_ROOM_CONTRACT.findByPk(ID).then((companyRoomContract) => {
        if (companyRoomContract) {
            console.log("From database: ", companyRoomContract);
            res.status(200).json({
                message: "Company Room Contract find successfuly!",
                companyRoomContract: companyRoomContract
            });
        } else {
            res.status(404).json({ message: "No valid entry found for provided ID" });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}

exports.companyRoomContractCreate = (req, res, next) => {
    const USER_ID = req.body.idUser;
    const COMPANY_ROOM_ID = req.body.idCompanyRoom;
    createContractAsync(req, res, next, USER_ID, COMPANY_ROOM_ID)
}
async function createContractAsync(req, res, next, USER_ID, COMPANY_ROOM_ID) {

    let companyFindByPk = new Promise((resolve, reject) => {
        COMPANY_ROOM.findByPk(COMPANY_ROOM_ID).then((companyRoom) => {
            if (companyRoom) {
                console.log("company room find")
                resolve(companyRoom);
            } else {
                res.status(404).json({ message: "No valid entry found for provided ID" });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    });


    companyRoom = await companyFindByPk;
    contractCreate = await createContract();
    // await updateNumber(companyRoom);

    // async function updateNumber(companyRoom) {
    //     COMPANY_ROOM.update({ numberOfUsers: companyRoom.numberOfUsers + 1 }, { where: { id: ID } })
    //         .then(() => {
    //             res.status(201).json({
    //                 message: "Company Room Contract created!"
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.status(500).json({ error: err });
    //         })
    // }
    async function createContract() {
        let createContract = new Promise((resolve, reject) => {
            COMPANY_ROOM_CONTRACT.create({
                idUser: USER_ID,
                idCompanyRoom: COMPANY_ROOM_ID
            }).then(result => {
                res.status(201).json({
                    message: "Company Room Contract created!"
                });
                console.log("create contract")
                resolve(result);
            }).catch((err) => {
                console.log(err);
                res.status(500).json({ error: err });
            });
        });
        return await createContract;
    }


}

exports.companyRoomContractDeleteOne = (req, res, next) => {
    const id = req.params.id;
    COMPANY_ROOM_CONTRACT.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).json({
            message: "CompanyRoomContract №" + id + " was deleted",
            request: {
                type: "DELETE",
                url: "http://localhost:3000/companyRoomContract",
                body: { name: "STRING", email: "STRING", password: "STRING" }
            }
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}