const COURT = require('../model/court');

//get all companyRooms func
exports.getAll = (req, res, next) => {
  COURT.findAll()
    .then((courts) => {
      if (courts) {
        console.log('From database: ', courts);
        res.status(200).json({
          courts: courts,
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
  COURT.findByPk(ID)
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

//multirequest and example of request from
exports.getCourtUsers = (req, res, next) => {
    const idCourt = req.params.id;
    const query = "SELECT `courtUsers`.`idUser`, `users`.`fullName` FROM `users`, `courtUsers` WHERE `users`.`id` = `courtUsers`.`idUser` AND `companyroomcontracts`.`idCompanyRoom` = " + idCompanyRoom;
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
        .then(users => {
            return res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}

//companyRoom update info func
exports.update = (req, res, next) => {
  const ID = req.params.id;

  const { address, image, name } = req.body;

  if (!!address) {
    COURT.update({ address }, { where: { id: ID } })
      .then(() => {
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }

  if (!!image) {
    COURT.update({ image }, { where: { id: ID } })
      .then(() => {
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }

  if (!!name) {
    COURT.update({ name }, { where: { id: ID } })
      .then(() => {
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }

  if (address == null && address == undefined) {
    return res.status(401).json({
      message: 'Your fields are empty',
    });
  }
  return res.status(200).json({
    message: 'Successful update. ZAEBUMBA!',
  });
};

//companyRoom create func
exports.create = (req, res, next) => {
  const { idCourtOwner, address, image, name } = req.body;

  COURT.create({
    idCourtOwner,
    address,
    image,
    name
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
  COURT.destroy({
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
