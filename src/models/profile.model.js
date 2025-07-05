import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  custom: {
    maps: [
      {
        data: { type: mongoose.Types.ObjectId, ref: "uploads" },
      },
    ],
    lobbys: [
      {
        data: { type: mongoose.Types.ObjectId, ref: "uploads" },
      },
    ],
  },
  playtime: { type: Number, required: false, default: 0 },
  settings: {
    materials: { type: Boolean, default: true },
    shaders: { type: Boolean, default: true },
  },
});

const Player = mongoose.model("players", playerSchema);

export default Player;
