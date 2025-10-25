import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  firstJoin: { type: Date, required: true },
  playtime: { type: Number, required: false, default: 0 },
  credits: { type: Number, default: 0 },
  ownedSkins: [{ type: String }],
  equippedSkins: [
    {
      systemName: { type: String, required: true },
      weaponName: { type: String, required: true },
      skinName: { type: String, required: true },
    }
  ],
  data: {
    kills: { type: Number, default: 0 },
    deaths: { type: Number, default: 0 },
    damageDealt: { type: Number, default: 0 },
    damageTaken: { type: Number, default: 0 },
    healDealt: { type: Number, default: 0 },
    healTaken: { type: Number, default: 0 },
  },
  settings: {
    materials: { type: Boolean, default: true },
    shaders: { type: Boolean, default: true },
  },
});

const Profile = mongoose.model("profiles", profileSchema);

export default Profile;
