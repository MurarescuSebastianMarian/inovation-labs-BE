const mongoose = require("mongoose");
const Group = require("../models/group");

// Register
exports.groups_add = async (req, res, next) => {
  try {
    // Obținem datele grupului din corpul cererii
    const { facultate, specializare, materie, users, maxNumberMembers } =
      req.body;

    // Creăm un nou obiect Group pe baza datelor primite
    const newGroup = new Group({
      _id: new mongoose.Types.ObjectId(),
      facultate,
      specializare,
      materie,
      users,
      maxNumberMembers,
    });

    // Salvăm grupul în baza de date
    const savedGroup = await newGroup.save();

    // Returnăm grupul creat ca răspuns
    return res.status(201).json({ group: savedGroup });
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res
      .status(500)
      .json({ message: "A apărut o eroare la crearea grupului.", error: err });
  }
};

// Get All
exports.groups_get_all = async (req, res, next) => {
  try {
    // Găsim toate grupurile în baza de date
    const groups = await Group.find();

    // Returnăm grupurile găsite ca răspuns
    return res.status(200).json(groups);
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
exports.groups_get = async (req, res, next) => {
  try {
    const groupId = req.params.id;

    // Găsim grupul în baza de date după ID
    const group = await Group.findById(groupId);

    // Verificăm dacă grupul a fost găsit
    if (!group) {
      return res.status(404).json({ message: "Grupul nu a fost găsit." });
    }

    // Returnăm grupul găsit ca răspuns
    return res.status(200).json({ group });
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res.status(500).json({
      message: "A apărut o eroare la obținerea grupului.",
      error: err,
    });
  }
};

// Update by ID
exports.groups_update = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const updateData = req.body; // Datele de actualizat primite în corpul cererii

    // Actualizăm grupul în baza de date după ID
    const group = await Group.findByIdAndUpdate(groupId, updateData, {
      new: true,
    });

    // Verificăm dacă grupul a fost găsit și actualizat
    if (!group) {
      return res.status(404).json({ message: "Grupul nu a fost găsit." });
    }

    // Returnăm grupul actualizat ca răspuns
    return res
      .status(200)
      .json({ message: "Grupul a fost actualizat cu succes.", data: group });
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res
      .status(500)
      .json({
        message: "A apărut o eroare la actualizarea grupului.",
        error: err,
      });
  }
};

// Delete by ID
exports.groups_delete = async (req, res, next) => {
  try {
    const groupId = req.params.id;

    // Ștergem grupul din baza de date după ID
    const group = await Group.findByIdAndDelete(groupId);

    // Verificăm dacă grupul a fost șters
    if (!group) {
      return res.status(404).json({ message: "Grupul nu a fost găsit." });
    }

    // Returnăm un răspuns de succes
    return res.status(200).json({ message: "Grupul a fost șters cu succes." });
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res.status(500).json({
      message: "A apărut o eroare la ștergerea grupului.",
      error: err,
    });
  }
};
