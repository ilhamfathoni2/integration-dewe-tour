const { trip, country, image } = require("../../models");
const Joi = require("joi");

exports.getTrips = async (req, res) => {
  try {
    const data = await trip.findAll({
      include: [
        {
          model: country,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "countryId"],
      },
    });

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getTripId = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await trip.findOne({
      where: {
        id,
      },
      include: [
        {
          model: country,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "countryId"],
      },
    });

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addTrip = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    countryId: Joi.number().required(),
    accomodation: Joi.string().required(),
    transportation: Joi.string().required(),
    eat: Joi.string().required(),
    day: Joi.string().required(),
    night: Joi.string().required(),
    dateTrip: Joi.date().required(),
    price: Joi.number().required(),
    quota: Joi.string().required(),
    description: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const { idUser } = req.user;
    const { image } = req.files;

    const allImage = [];
    for (let item of image) {
      allImage.push(item.filename);
    }

    const newTrip = await trip.create({
      title: req.body.title,
      countryId: req.body.countryId,
      accomodation: req.body.accomodation,
      transportation: req.body.transportation,
      eat: req.body.eat,
      day: req.body.day,
      night: req.body.night,
      dateTrip: req.body.dateTrip,
      price: req.body.price,
      quota: req.body.quota,
      description: req.body.description,
      image: JSON.stringify(allImage),
      idUser,
    });

    if (newTrip) {
      let data = await trip.findOne({
        where: {
          id: newTrip.id,
        },
        include: [
          {
            model: country,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "countryId"],
        },
      });

      data = JSON.parse(JSON.stringify(data));

      res.send({
        status: "success",
        message: "Add trip success",
        data: {
          data,
          image: "http://localhost:5000/uploads/" + data.image,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const { idUser } = req.user;
    const { id } = req.params;

    await trip.update(req.body, {
      where: {
        id,
      },
      idUser,
    });
    const data = await trip.findOne({
      include: [
        {
          model: country,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      message: "Edit trip success",
      datas: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const { idUser } = req.user;
    const { id } = req.params;

    await trip.destroy({
      where: {
        id,
      },
      idUser,
    });
    const data = await trip.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      message: "Delete trip success",
      datas: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
