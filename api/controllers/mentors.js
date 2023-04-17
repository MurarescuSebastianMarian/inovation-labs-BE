const mongoose = require("mongoose");
const Mentor = require("../models/mentor");

// Add
exports.mentors_add = async (req, res, next) => {
  try {
    // Obținem datele mentorului din corpul cererii
    const {
      mentorId,
      facultate,
      specializare,
      materie,
      users,
      maxNumberMembers,
    } = req.body;

    // Creăm un nou obiect Mentor pe baza datelor primite
    const newMentor = new Mentor({
      _id: new mongoose.Types.ObjectId(),
      mentorId,
      facultate,
      specializare,
      materie,
      users,
      maxNumberMembers,
    });

    // Salvăm mentorul în baza de date
    const savedMentor = await newMentor.save();

    // Returnăm mentorul creat ca răspuns
    return res.status(201).json({ mentor: savedMentor });
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res.status(500).json({
      message: "A apărut o eroare la crearea mentorului.",
      error: err,
    });
  }
};

// Get All
exports.mentors_get_all = async (req, res, next) => {
  try {
    // Găsim toate mentorii în baza de date
    const mentors = await Mentor.find();

    // Returnăm mentorii găsite ca răspuns
    return res.status(200).json(mentors);
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res.status(500).json({
      message: "A apărut o eroare la obținerea grupurilor.",
      error: err,
    });
  }
};

// Get by ID
exports.mentors_get = async (req, res, next) => {
  try {
    const mentorId = req.params.id;

    // Găsim mentorul în baza de date după ID
    const mentor = await Mentor.findById(mentorId);

    // Verificăm dacă mentorul a fost găsit
    if (!mentor) {
      return res.status(404).json({ message: "Mentorul nu a fost găsit." });
    }

    // Returnăm mentorul găsit ca răspuns
    return res.status(200).json({ mentor });
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res.status(500).json({
      message: "A apărut o eroare la obținerea mentorului.",
      error: err,
    });
  }
};

// Update by ID
exports.mentors_update = async (req, res, next) => {
  try {
    const mentorId = req.params.id;
    const updateData = req.body; // Datele de actualizat primite în corpul cererii

    // Actualizăm mentorul în baza de date după ID
    const mentor = await Mentor.findByIdAndUpdate(mentorId, updateData, {
      new: true,
    });

    // Verificăm dacă mentorul a fost găsit și actualizat
    if (!mentor) {
      return res.status(404).json({ message: "Mentorul nu a fost găsit." });
    }

    // Returnăm mentorul actualizat ca răspuns
    return res
      .status(200)
      .json({ message: "Mentorul a fost actualizat cu succes.", data: mentor });
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res.status(500).json({
      message: "A apărut o eroare la actualizarea mentorului.",
      error: err,
    });
  }
};

// Delete by ID
exports.mentors_delete = async (req, res, next) => {
  try {
    const mentorId = req.params.id;

    // Ștergem mentorul din baza de date după ID
    const mentor = await Mentor.findByIdAndDelete(mentorId);

    // Verificăm dacă mentorul a fost șters
    if (!mentor) {
      return res.status(404).json({ message: "Mentorul nu a fost găsit." });
    }

    // Returnăm un răspuns de succes
    return res
      .status(200)
      .json({ message: "Mentorul a fost șters cu succes." });
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res.status(500).json({
      message: "A apărut o eroare la ștergerea mentorului.",
      error: err,
    });
  }
};
