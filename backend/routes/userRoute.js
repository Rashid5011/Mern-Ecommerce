const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getUserDetail,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");
const router = express.Router();

// user route

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/update/password").put(isAuthenticatedUser, updateUserPassword);
router.route("/update/profile").put(isAuthenticatedUser, updateUserProfile);

// admin route

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedRole("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRole("admin"), getUserDetail)
  .put(isAuthenticatedUser, authorizedRole("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizedRole("admin"), deleteUser);

module.exports = router;
