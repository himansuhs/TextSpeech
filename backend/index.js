const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongooseConnect = require("./config/mongooseConnect");
const translationRouter = require("./routes/translation-text.routes");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use("/", translationRouter);
app.use("/api/auth", authRoutes);

app.listen(PORT, async () => {
  await mongooseConnect();
  console.log(`http://localhost:${PORT}`);
});
