const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

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
  reviews:[
    {
      type: Schema.Types.ObjectId, // Referencing Review model
      ref: "Review",
    }
  ]
});

listingSchema.post("findOneAndDelete", async(listing) =>{
    if(listing){
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;