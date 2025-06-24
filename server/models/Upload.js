import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema(
  {
    name: { type: String},
    description: { type: String },
    imageUrl: { type: String }, 
    videoUrl: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.model("Upload", UploadSchema);