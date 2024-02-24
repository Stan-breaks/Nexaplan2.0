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
router.get("/list/priority", (req, res) => {
  Task.find({ user: req.session.user._id, isPriority: true })
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error");
    });
});

router.get("/list/:category", (req, res) => {
  const { category } = req.params;
  Task.find({ user: req.session.user._id, category })
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error");
    });
});

router.post("", (req, res) => {
  const { taskName, taskDescription, isPriority, dueDate, category } = req.body;
  if (taskName && taskDescription && dueDate && category) {
    const newTask = new Task({
      user: req.session.user._id,
      taskName,
      taskDescription,
      isPriority,
      dueDate,
      category,
    });
    newTask
      .save()
      .then(() => {
        res.status(201).send("Task created");
      })
      .catch((err) => {
        res.status(500).send("Internal Server Error");
      });
  } else {
    res.status(400).send("Bad Request");
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Task.findById(id)
    .then((task) => {
      res.status(200).send(task);
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
