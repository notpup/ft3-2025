import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const uploadSchema = new mongoose.Schema({
  active: { type: Boolean, required: false, default: true },
  public: { type: Boolean, required: false, default: false },
  uploadedBy: { type: String, required: true },
  assetId: { type: String, required: true, unique: true },
  version: { type: Number, required: true, unique: true },
  created: { type: Date, required: true },
  lastUpdated: { type: Date, required: true },
  playTime: { type: Number, required: false, default: 0 },
  imageId: { type: String, required: true },
  name: { type: String, required: true },
  parts: { type: Number, required: true },
  unions: { type: Number, required: true },
  uploadType: {
    type: String,
    required: true,
    enum: ["map", "lobby", "skybox"],
  },
});

uploadSchema.plugin(mongoosePaginate);

const Upload = mongoose.model("uploads", uploadSchema);
export default Upload;
