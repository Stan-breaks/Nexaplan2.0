const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const session = require("express-session");

//database
require("./database");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "fdslajfsnfdsjsdaclcdsmcdskmsmmdsl",
    resave: true,
    saveUninitialized: true,
  }),
);

// routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
