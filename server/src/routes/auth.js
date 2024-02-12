const { Router } = require("express");
const router = Router();


router.post("/register", (req, res) => {
  res.send("Register");
});


module.exports = router;
