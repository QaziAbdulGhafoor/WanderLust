const express = require("express");
const app = express();
const path = require("path");
const Listing = require("./models/listing");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/listings"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

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

app.get("/listings/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listingd.ejs", { listing });
});

app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("edit.ejs", { listing });
  // console.log(listing);
  // res.render("listingd.ejs", { listing });
});

app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

app.post("/listings", (req, res) => {
  let newListing = new Listing(req.body.listing);
  newListing
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("stoppppppppp", err);
    });
  res.redirect("/listings");
});

app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
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
