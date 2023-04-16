const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const UsersController = require("../controllers/users");

// Login
router.post("/login", UsersController.users_login);

// Register
router.post("/singup", UsersController.users_singup);

// Get All
router.get("/get_all", UsersController.users_get_all);

// Get by ID
router.get("/get_by_id/:id", UsersController.users_get_by_id);

// Update by ID
router.put("/update_by_id/:id", UsersController.users_update_by_id);

// Delete by ID
router.delete("/delete_by_id/:id", UsersController.users_delete_by_id);

module.exports = router;
