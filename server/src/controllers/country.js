const { country } = require("../../models");
const Joi = require("joi");

exports.addCountrys = async (req, res) => {
  const { adminOnly } = req.user;

  const schema = Joi.object({
    name: Joi.string(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const countryExist = await country.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (countryExist) {
      return res.status(400).send({
        status: "400",
        message: "Country already exist",
      });
    }

    let dataCountry = await country.create({
      name: req.body.name,
      adminOnly,
    });

    if (dataCountry) {
      const data = await country.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.send({
        status: "success",
        message: "Add country success",
        data: data,
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

exports.getCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const countrys = await country.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: countrys,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getAllCountry = async (req, res) => {
  try {
    const countrys = await country.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: countrys,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminOnly } = req.user;

    await country.update(req.body, {
      where: {
        id,
      },
      adminOnly,
    });
    const data = await country.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      message: "Update country success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteCountry = async (req, res) => {
  const { id } = req.params;
  const { adminOnly } = req.user;

  try {
    await country.destroy({
      where: {
        id,
      },
      adminOnly,
    });

    res.send({
      status: "success",
      message: "delete country successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
