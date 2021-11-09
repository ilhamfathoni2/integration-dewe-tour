const express = require("express");

const router = express.Router();

// Controller
const {
  addCountrys,
  getCountry,
  getAllCountry,
  deleteCountry,
  updateCountry,
} = require("../controllers/country");
const {
  register,
  login,
  deleteUser,
  getAllUsers,
  checkAuth,
} = require("../controllers/auth");
const {
  getTrips,
  addTrip,
  getTripId,
  updateTrip,
  deleteTrip,
} = require("../controllers/trip");

const { auth, adminOnly } = require("../middleware/auth");
const { uploadFile } = require("../middleware/uploadFile");
const { attachmentFile } = require("../middleware/attachment");

const {
  getTransactions,
  getTransactionId,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTrscHistory,
} = require("../controllers/transaction");

// Route
router.post("/register", register);
router.post("/login", login);
router.get("/users", auth, adminOnly, getAllUsers);
router.delete("/users/:id", auth, adminOnly, deleteUser);
router.get("/check-auth", auth, checkAuth);

router.post("/country", auth, adminOnly, addCountrys);
router.get("/country", getAllCountry);
router.get("/country/:id", getCountry);
router.patch("/country/:id", auth, adminOnly, updateCountry);
router.delete("/country/:id", auth, adminOnly, deleteCountry);

router.get("/trip", getTrips);
router.get("/trip/:id", getTripId);
router.post("/trip", auth, adminOnly, uploadFile("image"), addTrip);
router.patch("/trip/:id", auth, adminOnly, updateTrip);
router.delete("/trip/:id", auth, adminOnly, deleteTrip);

router.get("/history", auth, getTrscHistory);

router.get("/transaction", auth, getTransactions);
router.get("/transaction/:id", auth, getTransactionId);
router.post("/transaction", auth, addTransaction);
router.patch(
  "/transaction/:id",
  auth,
  attachmentFile("attachment"),
  updateTransaction
);
router.delete("/transaction/:id", auth, deleteTransaction);

module.exports = router;
