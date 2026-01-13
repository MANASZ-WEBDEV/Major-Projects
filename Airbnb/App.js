const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


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

app.get("/", (req, res) => {
  res.send("Hi, I am root!");
});

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
app.get("/listings", async (req, res) => {
  const alllisting = await Listing.find({});
  res.render("listings/index.ejs", { alllisting})
});

// New Route - to show form to create new listing
app.get("/listings/new", (req, res)=>{ 
  res.render("listings/new.ejs")
});

// Show Route - to show details of a particular listing
app.get("/listings/:id", async (req, res)=>{
  const {id} = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/show.ejs", {listing})

})

// Create Route - to create a new listing
app.post("/listings", async (req, res)=>{
  const newListing = new Listing(req.body);
  await newListing.save();
  res.redirect(`/listings/${newListing._id}`);                    
});

// Edit Route - to show form to edit a listing
app.get("/listings/:id/edit", async (req, res)=>{
  const {id} = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/edit.ejs", {listing})
});

// Update Route - to update a particular listing

// app.post("/listings/:id", async (req, res)=>{ // Also works but not RESTful
//   const {id} = req.params;
//   await Listing.findByIdAndUpdate(id, req.body, {runValidators:true, new:true});
//   res.redirect(`/listings/${id}`);
// });

app.put("/listings/:id", async (req, res)=>{ // RESTful way
  const {id} = req.params;
  await Listing.findByIdAndUpdate(id, req.body, {runValidators:true, new:true});
  res.redirect(`/listings/${id}`);
});

// Delete Route - to delete a particular listing
app.delete("/listings/:id", async (req, res)=>{
  const {id} = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
