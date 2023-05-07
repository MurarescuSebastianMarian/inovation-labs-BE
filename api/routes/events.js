const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const EventsController = require("../controllers/events");

// Add Group
router.post("/add", EventsController.events_add);

// Get All Group
router.get("/get_all", EventsController.events_get_all);

// Get Single Group
router.get("/get/:id", EventsController.events_get);

// Update Group
router.put("/update/:id", EventsController.events_update);

// Delete Group
router.delete("/delete/:id", EventsController.events_delete);

module.exports = router;
