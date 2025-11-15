const express = require("express");
const app = express();
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

app.get("/main", (req, res) => {
  res.send("you contacted main");
});
