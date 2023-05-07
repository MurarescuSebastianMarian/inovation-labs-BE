const mongoose = require("mongoose");
const Event = require("../models/event");

// Register
exports.events_add = async (req, res, next) => {
  try {
    // Obținem datele eventului din corpul cererii
    const { start, end, title } = req.body;

    // Creăm un nou obiect Event pe baza datelor primite
    const newEvent = new Event({
      _id: new mongoose.Types.ObjectId(),
      start,
      end,
      title,
    });

    // Salvăm eventul în baza de date
    const savedEvent = await newEvent.save();

    // Returnăm eventul creat ca răspuns
    return res.status(201).json({ event: savedEvent });
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res
      .status(500)
      .json({ message: "A apărut o eroare la crearea eventului.", error: err });
  }
};

// Get All
exports.events_get_all = async (req, res, next) => {
  try {
    // Găsim toate eventurile în baza de date
    const events = await Event.find();

    // Returnăm eventurile găsite ca răspuns
    return res.status(200).json(events);
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res.status(500).json({
      message: "A apărut o eroare la obținerea eventurilor.",
      error: err,
    });
  }
};

// Get by ID
exports.events_get = async (req, res, next) => {
  try {
    const eventId = req.params.id;

    // Găsim eventul în baza de date după ID
    const event = await Event.findById(eventId);

    // Verificăm dacă eventul a fost găsit
    if (!event) {
      return res.status(404).json({ message: "Eventul nu a fost găsit." });
    }

    // Returnăm eventul găsit ca răspuns
    return res.status(200).json({ event });
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res.status(500).json({
      message: "A apărut o eroare la obținerea eventului.",
      error: err,
    });
  }
};

// Update by ID
exports.events_update = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const updateData = req.body; // Datele de actualizat primite în corpul cererii

    // Actualizăm eventul în baza de date după ID
    const event = await Event.findByIdAndUpdate(eventId, updateData, {
      new: true,
    });

    // Verificăm dacă eventul a fost găsit și actualizat
    if (!event) {
      return res.status(404).json({ message: "Eventul nu a fost găsit." });
    }

    // Returnăm eventul actualizat ca răspuns
    return res
      .status(200)
      .json({ message: "Eventul a fost actualizat cu succes.", data: event });
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res.status(500).json({
      message: "A apărut o eroare la actualizarea eventului.",
      error: err,
    });
  }
};

// Delete by ID
exports.events_delete = async (req, res, next) => {
  try {
    const eventId = req.params.id;

    // Ștergem Eventul din baza de date după ID
    const event = await Event.findByIdAndDelete(eventId);

    // Verificăm dacă eventul a fost șters
    if (!event) {
      return res.status(404).json({ message: "Eventul nu a fost găsit." });
    }

    // Returnăm un răspuns de succes
    return res.status(200).json({ message: "Eventul a fost șters cu succes." });
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res.status(500).json({
      message: "A apărut o eroare la ștergerea eventului.",
      error: err,
    });
  }
};
