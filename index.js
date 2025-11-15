const express = require("express");
const app = express();
const Listing = require("./models/listing");
const mongoose = require("mongoose");

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

app.get("/testListing", async (req, res) => {
  let sampleListing = new Listing({
    title: "My new villa",
    description: "By the beach",
    price: 15000,
    location: "Karachi, Sindh",
    country: "Pakistan",
  });
  await sampleListing.save();
  console.log("sample was saved");
  res.send("successful testing");
});
