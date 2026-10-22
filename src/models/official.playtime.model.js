import mongoose, { mongo } from "mongoose";

const types = ["map", "lobby", "system", "gamemode"];

const playtimeSchema = new mongoose.Schema(
  {
    _id:   { type: String, required: true },
    name:  { type: String, required: true, trim: true, minlength: 1 },
    type:  { type: String, enum: types, required: true },
    total: { type: Number, default: 0 },
    year:  { type: Map, of: Number },
    month: { type: Map, of: Number },
    week:  { type: Map, of: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const OfficialPlaytime = mongoose.model("official_playtimes", playtimeSchema);
export default OfficialPlaytime;
