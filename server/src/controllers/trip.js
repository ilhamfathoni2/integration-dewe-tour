const { trip, country, image } = require("../../models");
const Joi = require("joi");
const pathFile = "http://localhost:5000/uploads/";

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

    const newData = data.map((item) => ({
      id: item.id,
      title: item.title,
      country: item.country,
      accomodation: item.accomodation,
      transportation: item.transportation,
      eat: item.eat,
      day: item.day,
      night: item.night,
      dateTrip: item.dateTrip,
      price: item.price,
      quota: item.quota,
      description: item.description,
      image: JSON.parse(item.image).map((image, index) => ({
        id: index + 1,
        url: pathFile + image,
      })),
    }));

    res.send({
      status: "success...",
      data: newData,
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
    const data = await trip.findAll({
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

    const newData = data.map((item) => ({
      id: item.id,
      title: item.title,
      country: item.country,
      accomodation: item.accomodation,
      transportation: item.transportation,
      eat: item.eat,
      day: item.day,
      night: item.night,
      dateTrip: item.dateTrip,
      price: item.price,
      quota: item.quota,
      description: item.description,
      image: JSON.parse(item.image).map((image, index) => ({
        id: index + 1,
        url: pathFile + image,
      })),
    }));

    res.send({
      status: "success...",
      data: newData,
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
    const arrayFilename = req.files.image.map((item) => item.filename);

    const newTrip = await trip.create({
      ...req.body,
      image: JSON.stringify(arrayFilename),
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

      const newData = {
        ...data,
        image: JSON.parse(data.image).map((image, index) => ({
          id: index + 1,
          url: pathFile + image,
        })),
      };

      res.send({
        status: "success",
        message: "Add trip success",
        data: newData,
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
