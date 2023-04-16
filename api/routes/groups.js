const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const GroupsController = require("../controllers/groups");

// Add Group
router.post("/add", GroupsController.groups_add);

// Get All Group
router.get("/get_all", GroupsController.groups_get_all);

// Get Single Group
router.get("/get/:id", GroupsController.groups_get);

// Update Group
router.put("/update/:id", GroupsController.groups_update);

// Delete Group
router.delete("/delete/:id", GroupsController.groups_delete);

module.exports = router;
