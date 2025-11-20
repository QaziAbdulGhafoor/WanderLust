const express = require("express");
const app = express();
const path = require("path");
const Listing = require("./models/listing");
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// mongo db connection

main()
  .then(() => {
    console.log("connected to mongo db");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const port = 8080;
app.listen(port, () => {
  console.log("listening to port");
});

app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/listings", async (req, res) => {
  let listings = await Listing.find();
  res.render("index.ejs", { listings });
  // console.log(listings);
});

app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  console.log(listing);
  res.render("listingd.ejs", { listing });
});
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My new villa",
//     description: "By the beach",
//     price: 15000,
//     location: "Karachi, Sindh",
//     country: "Pakistan",
//   });
//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });
