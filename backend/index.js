const connectToMongo = require("./DB");
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

connectToMongo();

const app = express();
const PORT = 8080;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/foodbank/auth", require("./routes/auth"));
app.use("/foodbank/data", require("./routes/data"));

app.listen(PORT, () => {
  console.log(` app listening at http://localhost:${PORT} `);
});
