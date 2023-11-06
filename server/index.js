const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 5000;
app.use(cors());
app.use(express.json());
app.get("/callback", (req, res) => {
  res.json("sent back");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
