const express = require("express");
const route = require("./routes/route.js");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://rohankumar123:W9ilajafsNQPKnRm@cluster0.ixwo59p.mongodb.net/personal_DB",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log(`mongoDB is connected`);
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use("/", route);
app.listen((process.env.PORT || 3000), () => {
  console.log(`App is runnig on port ` + (process.env.PORT || 3000));
});
