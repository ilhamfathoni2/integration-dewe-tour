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
  user,
  updateUser,
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
  incomTrsc,
  updateIncom,
  profit,
} = require("../controllers/transaction");

// Route
router.get("/check-auth", checkAuth);

router.post("/register", register);
router.post("/login", login);
router.get("/users", auth, adminOnly, getAllUsers);
router.delete("/users/:id", auth, adminOnly, deleteUser);
router.get("/user-data", auth, user);
// router.patch("/update-user", auth, uploadFile("image"), updateUser);

router.post("/country", auth, adminOnly, addCountrys);
router.get("/country", getAllCountry);
router.get("/country/:id", getCountry);
router.patch("/country/:id", auth, adminOnly, updateCountry);
router.delete("/country/:id", auth, adminOnly, deleteCountry);

router.get("/trip", getTrips);
router.get("/trip/:id", getTripId);
router.post("/trip", auth, adminOnly, uploadFile("image"), addTrip);
router.patch("/trip/:id", auth, updateTrip);
router.delete("/trip/:id", auth, adminOnly, deleteTrip);

router.post("/transaction", auth, addTransaction);
router.get("/transaction", auth, getTransactions);
router.get("/transaction/:id", auth, getTransactionId);
router.get("/profit", auth, adminOnly, profit);
router.patch(
  "/transaction/:id",
  auth,
  attachmentFile("attachment"),
  updateTransaction
);

router.get("/history", auth, getTrscHistory);
router.get("/incom-transaction", auth, incomTrsc);

router.patch("/update-incom/:id", auth, adminOnly, updateIncom);
router.delete("/transaction/:id", auth, deleteTransaction);

module.exports = router;
