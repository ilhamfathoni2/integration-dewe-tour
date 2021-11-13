const { user } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const schema = Joi.object({
    fullname: Joi.string().min(5).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().min(11).required(),
    address: Joi.string().required(),
    role: Joi.string(),
  });

  const { error } = schema.validate(req.body);

  // if error exist send validation error message
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    // check if email already exist in database
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExist) {
      return res.status(400).send({
        status: "failed",
        message: "email already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const userRole = "user";

    const newUser = await user.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      address: req.body.address,
      role: userRole,
    });

    // generate token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.TOKEN_KEY
    );

    res.status(200).send({
      status: "success...",
      data: {
        fullname: newUser.fullname,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        role: newUser.role,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  // our validation schema here
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });

  // do validation and get error object from schema.validate
  const { error } = schema.validate(req.body);

  // if error exist send validation error message
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (userExist) {
      // compare password between entered from client and from database
      const isValid = await bcrypt.compare(
        req.body.password,
        userExist.password
      );

      // check if not valid then return response with status 400 (bad request)
      if (!isValid) {
        return res.status(400).send({
          status: "failed",
          message: "credential is invalid",
        });
      }

      // generate token
      const token = jwt.sign(
        { id: userExist.id, email: userExist.email, role: userExist.role },
        process.env.TOKEN_KEY
      );

      res.status(200).send({
        status: "success...",
        data: {
          fullname: userExist.fullname,
          email: userExist.email,
          phone: userExist.phone,
          address: userExist.address,
          role: userExist.role,
          token,
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

exports.getAllUsers = async (req, res) => {
  try {
    const { adminOnly } = req.user;

    const data = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
      adminOnly,
    });

    res.send({
      status: "success",
      message: "Get data user success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { idUser } = req.user;
    const { id } = req.params;

    await user.destroy({
      where: {
        id,
      },
      idUser,
    });
    const data = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      message: "Delete user success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const dataUser = await user.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success",
      data: {
        id: dataUser.id,
        fullname: dataUser.fullname,
        email: dataUser.email,
        phone: dataUser.phone,
        address: dataUser.address,
        role: dataUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.user = async (req, res) => {
  try {
    const dataUser = await user.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success",
      data: [
        {
          id: dataUser.id,
          fullname: dataUser.fullname,
          email: dataUser.email,
          phone: dataUser.phone,
          address: dataUser.address,
          role: dataUser.role,
        },
      ],
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
