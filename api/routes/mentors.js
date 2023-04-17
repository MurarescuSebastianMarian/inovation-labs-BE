const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const MentorsController = require("../controllers/mentors");

// Add Mentor
router.post("/add", MentorsController.mentors_add);

// Get All Mentor
router.get("/get_all", MentorsController.mentors_get_all);

// Get Single Mentor
router.get("/get/:id", MentorsController.mentors_get);

// Update Mentor
router.put("/update/:id", MentorsController.mentors_update);

// Delete Mentor
router.delete("/delete/:id", MentorsController.mentors_delete);

module.exports = router;
