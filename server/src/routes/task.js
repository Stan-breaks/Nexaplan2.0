const { Router } = require("express");
const router = Router();
const Task = require("../database/schemas/Task");

router.get("/list", (req, res) => {
  Task.find({ user: req.session.user._id })
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
