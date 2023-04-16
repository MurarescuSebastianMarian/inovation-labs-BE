const mongoose = require("mongoose");
const User = require("./user"); // Importăm modelul User

// Definirea schemăi pentru modelul "Group"
const groupSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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

// Crearea modelului "Group" pe baza schemei definite
const Group = mongoose.model("Group", groupSchema);

// Exportarea modelului pentru a fi utilizat în altă parte a aplicației
module.exports = Group;
