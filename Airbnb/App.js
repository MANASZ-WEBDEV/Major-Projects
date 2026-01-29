const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

const app = express();
const port = 3000;
app.engine("ejs", ejsMate); // for using ejs-mate as template engine
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public"))); // to use static files like css

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // this helps to parse form data like req.body.title to get title from form
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("Hi, I am root!");
});

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body); 
  if (error) {
    // let errMsg = error.details.map((el) => el.message).join(", ");
    return next(new ExpressError(400, error ));  // Must use next() not throw
  }else{
    next();
  }
};

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    // let errMsg = error.details.map((el) => el.message).join(", ");
    return next(new ExpressError(400, error ));  // Must use next() not throw
  }else{
    next();
  }
};

// app.get("/testlisting", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "Beach House",
//     description: "Sea facing villa",
//     // image: "https://img.com/house.jpg",
//     price: 5000,
//     location: "Goa",
//     country: "India",
//   });
//   await sampleListing.save();
//   console.log("Sample listing saved:", sampleListing);
//   res.send("Sample listing created and saved to database.");
// });

// Index Route - to show all listings
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const alllisting = await Listing.find({});
    res.render("listings/index.ejs", { alllisting });
  }),
);

// New Route - to show form to create new listing
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route - to show details of a particular listing
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  }),
);

// Create Route - to create a new listing
app.post(
  "/listings", validateListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);  // Fixed: use req.body.listing
    await newListing.save();
    res.redirect(`/listings`);
  }),
);

// Edit Route - to show form to edit a listing
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  }),
);

// Update Route - to update a particular listing

// app.post("/listings/:id", async (req, res)=>{ // Also works but not RESTful
//   const {id} = req.params;
//   await Listing.findByIdAndUpdate(id, req.body, {runValidators:true, new:true});
//   res.redirect(`/listings/${id}`);
// });

// RESTful way
app.put(
  "/listings/:id", validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing, {  // Use req.body.listing
      runValidators: true,
      new: true,
    });
    res.redirect(`/listings/${id}`);
  }),
);

// Delete Route - to delete a particular listing
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  }),
);

// Reviews 
// POST Route
app.post("/listings/:id/reviews", validateReview ,wrapAsync( async(req, res) =>{
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  res.redirect(`/listings/${listing._id}`); 
}))

// Delete Review Route
app.delete("/listings/:id/reviews/:reviewId", wrapAsync( async(req, res) =>{
  let {id, reviewId} = req.params;
  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);
}));

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
}); 

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { err });
  // res.status(statusCode).send(message);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
