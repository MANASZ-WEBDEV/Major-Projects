const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default: "https://a0.muscache.com/im/pictures/hosting/Hosting-1561436729203752692/original/fdef84ff-1e05-4ba5-82c0-d03f370edd02.jpeg?im_w=480",
    set: (v) =>
      v === ""
        ? "https://a0.muscache.com/im/pictures/hosting/Hosting-1561436729203752692/original/fdef84ff-1e05-4ba5-82c0-d03f370edd02.jpeg?im_w=480"
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
