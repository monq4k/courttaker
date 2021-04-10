const USER_COURT = require('../model/court');

//get all companyRooms func
exports.getAll = (req, res, next) => {
  USER_COURT.findAll()
    .then((companyRooms) => {
      if (companyRooms) {
        console.log('From database: ', companyRooms);
        res.status(200).json({
          companyRooms: companyRooms,
        });
      } else {
        res
          .status(404)
          .json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

//get info about one companyRoom
exports.getOne = (req, res, next) => {
  const ID = req.params.id;
  USER_COURT.findByPk(ID)
    .then((companyRoom) => {
      if (companyRoom) {
        console.log('From database: ', companyRoom);
        res.status(200).json({
          companyRoom: companyRoom,
        });
      } else {
        res
          .status(404)
          .json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// //multirequest and example of request from
// exports.companyRoomGetUsers = (req, res, next) => {
//     const idCompanyRoom = req.params.id;
//     const query = "SELECT `companyroomcontracts`.`idUser`, `users`.`fullName` FROM `users`, `companyroomcontracts` WHERE `users`.`id` = `companyroomcontracts`.`idUser` AND `companyroomcontracts`.`idCompanyRoom` = " + idCompanyRoom;
//     sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
//         .then(connections => {
//             return res.status(200).json(connections);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err });
//         })
// }

//companyRoom create func
exports.create = (req, res, next) => {
  const { idCourt, idUser } = req.body;

  USER_COURT.create({
    idCourt,
    idUser,
  })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        request: {
          type: 'POST',
          body: { name: 'STRING', email: 'STRING', password: 'STRING' },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

//companyRoom delete func
exports.delete = (req, res, next) => {
  const id = req.params.id;
  USER_COURT.destroy({
    where: { id: id },
  })
    .then(() => {
      res.status(200).json({
        request: {
          type: 'DELETE',
          body: { name: 'STRING', email: 'STRING', password: 'STRING' },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
