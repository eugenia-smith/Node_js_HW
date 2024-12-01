import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: false },
});

const Publisher = mongoose.model("Publisher", publisherSchema);

export default Publisher;
