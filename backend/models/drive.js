const mongoose = require("mongoose");
const { Schema } = mongoose;

const CampaignSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  qr: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  target: {
    type: Number,
    required: true,
  },
  upi: {
    type: String,
    required: true,
  },
});
const Drive = mongoose.model("drives", CampaignSchema);
module.exports = Drive;
