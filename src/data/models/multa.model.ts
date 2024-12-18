import mongoose from 'mongoose'

const multaSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
    min: 0,
  },
  limit: {
    type: Number,
    required: true,
    min: 0,
  },
  lat: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  lng: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
  isEmailSent: {
    type: Boolean,
    default: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

export const MultaModel = mongoose.model("Multas", multaSchema);