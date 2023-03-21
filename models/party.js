const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for party
const PartySchema = new Schema({
  party_name: {
    type: String,
    required: [true, "The party name text field is required"],
  },
  date: {
    type: Date,
    required: [true, "The date field is required"],
  },
  time: {
    type: String,
    required: [true, "The time field is required"],
  },
  location: {
    type: String,
    required: [true, "The location field is required"],
  },
  host: {
    type: String,
    required: [true, "The host field is required"],
  },
  max_guests: {
    type: Number,
    required: [true, "The max guests field is required"],
  },
  guests: {
    type: Array,
    required: [true, "The guests field is required"],
  },
});

// Create model for party
const Party = mongoose.model("party", PartySchema);

module.exports = Party;
