const mongoose = require("mongoose");
const User = require("./user"); // Importăm modelul User

// Definirea schemăi pentru modelul "Mentor"
const mentorSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  facultate: {
    type: String,
    required: true,
  },
  specializare: {
    type: String,
    required: true,
  },
  materie: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  maxNumberMembers: {
    type: Number,
    required: true,
  },
});

// Crearea modelului "Mentor" pe baza schemei definite
const Mentor = mongoose.model("Mentor", mentorSchema);

// Exportarea modelului pentru a fi utilizat în altă parte a aplicației
module.exports = Mentor;
