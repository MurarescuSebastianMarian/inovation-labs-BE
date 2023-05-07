const mongoose = require("mongoose");

// Definirea schemăi pentru modelul "Event"
const eventSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  // participants: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
});

// Crearea modelului "Event" pe baza schemei definite
const Event = mongoose.model("Event", eventSchema);

// Exportarea modelului pentru a fi utilizat în altă parte a aplicației
module.exports = Event;
