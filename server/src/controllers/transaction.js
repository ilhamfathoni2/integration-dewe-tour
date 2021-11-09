const { trip, user, transaction } = require("../../models");
const Joi = require("joi");

exports.getTransactions = async (req, res) => {
  try {
    const { id } = req.user;

    const data = await transaction.findAll({
      where: {
        status: "Waiting Payment",
        userId: id,
      },
      include: [
        {
          model: trip,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: user,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      id,
    });

    res.send({
      status: "success...",
      data,
      attachments: "http://localhost:5000/uploads/" + data.attachment,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getTrscHistory = async (req, res) => {
  try {
    const { id } = req.user;

    const data = await transaction.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: trip,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: user,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      id,
    });

    res.send({
      status: "success...",
      data,
      attachments: "http://localhost:5000/uploads/" + data.attachment,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getTransactionId = async (req, res) => {
  try {
    const { idUser } = req.user;
    const { id } = req.params;
    const data = await transaction.findOne({
      where: {
        id,
      },
      include: [
        {
          model: trip,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: user,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      idUser,
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

exports.addTransaction = async (req, res) => {
  try {
    const { idUser } = req.user;

    const newTransaction = await transaction.create({
      counterQty: req.body.counterQty,
      total: req.body.total,
      accomodation: req.body.accomodation,
      status: req.body.status,
      tripId: req.body.tripId,
      userId: req.body.userId,
      country: req.body.country,
      // attachment: req.files.attachment[0].filename,
      attachment: req.body.attachment,
      idUser,
    });

    if (newTransaction) {
      let data = await transaction.findOne({
        where: {
          id: newTransaction.id,
        },
        include: [
          {
            model: trip,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: user,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      data = JSON.parse(JSON.stringify(data));

      res.send({
        status: "success",
        message: "Transaction success",
        datas: {
          data,
          attachment: "http://localhost:5000/uploads/" + data.attachment,
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

exports.updateTransaction = async (req, res) => {
  const iduser = req.user.id;
  const { id } = req.params;
  try {
    await transaction.update(req.body, {
      where: {
        id,
      },
      status: req.body.status,
      attachment: req.files.attachment[0].filename,
      iduser,
    });
    const data = await transaction.findOne({
      include: [
        {
          model: trip,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: user,
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
      message: "Edit transaction success",
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

exports.deleteTransaction = async (req, res) => {
  try {
    const { idUser } = req.user;
    const { id } = req.params;

    await transaction.destroy({
      where: {
        id,
      },
      idUser,
    });
    const data = await transaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      message: "Delete transaction success",
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
