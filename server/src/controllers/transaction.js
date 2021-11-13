const { trip, user, transaction } = require("../../models");
const Joi = require("joi");

exports.getTransactions = async (req, res) => {
  try {
    const token = req.user;

    const data = await transaction.findAll({
      where: {
        status: "Waiting Payment",
        userId: req.user.id,
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
      token,
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

exports.getTrscHistory = async (req, res) => {
  try {
    const token = req.user;

    const data = await transaction.findAll({
      where: {
        userId: req.user.id,
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
      token,
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

exports.incomTrsc = async (req, res) => {
  try {
    const { idUser } = req.user;

    const data = await transaction.findAll({
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
            exclude: ["createdAt", "updatedAt", "password"],
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

exports.addTransaction = async (req, res) => {
  try {
    const newTransaction = await transaction.create({
      counterQty: req.body.counterQty,
      total: req.body.total,
      accomodation: req.body.accomodation,
      status: req.body.status,
      tripId: req.body.tripId,
      userId: req.user.id,
      country: req.body.country,
      attachment: req.body.attachment,
    });

    console.log(newTransaction);

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
        datas: data,
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
  const { id } = req.params;
  try {
    await transaction.update(
      {
        status: req.body.status,
        attachment: req.files.attachment[0].filename,
      },

      {
        where: {
          id,
        },
      }
    );
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

exports.updateIncom = async (req, res) => {
  const { id } = req.params;
  const token = req.user;
  try {
    await transaction.update(
      {
        status: req.body.status,
      },
      {
        where: {
          id,
        },
      },
      token
    );
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
