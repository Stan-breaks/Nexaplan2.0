const express = require("express");
const app = express();
const port = 3000;

// middleware


// routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
