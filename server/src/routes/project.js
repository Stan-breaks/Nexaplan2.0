const { Router } = require("express");
const router = Router();
const User = require("../database/schemas/User");
const Task = require("../database/schemas/Task");
const Project = require("../database/schemas/Project");

router.get("/list", (req, res) => {
  Project.find({ user: req.session.user._id })
    .then((projects) => {
      res.status(200).send(projects);
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error");
    });
});

router.get("/list/:category", (req, res) => {
  const { category } = req.params;
  Project.find({ user: req.session.user._id, category })
    .then((projects) => {
      res.status(200).send(projects);
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error");
    });
});

router.post("/tasks", (req, res) => {
  const {
    projectId,
    taskName,
    taskDescription,
    isPriority,
    dueDate,
    category,
  } = req.body;
  if (projectId && taskName && taskDescription && dueDate && category) {
    const newTask = new Task({
      user: req.session.user._id,
      project: projectId,
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

router.get("/tasks", (req, res) => {
  const { projectId } = req.query;
  Task.find({ project: projectId })
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error");
    });
});

router.post("", (req, res) => {
  const { projectName, projectDescription, category } = req.body;

  if (projectName && projectDescription && category) {
    const newProject = new Project({
      user: req.session.user._id,
      projectName,
      projectDescription,
      category,
    });
    newProject
      .save()
      .then(() => {
        res.status(201).send("Project created");
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
  Project.findById(id)
    .then((project) => {
      res.status(200).send(project);
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error");
    });
});

router.get("/:id/contributor", async (req, res) => {
  const { id: projectId } = req.params;
  try {
    const project = await Project.findById(projectId);
    const users = await Promise.all(
      project.contributors.map((contributorId) => User.findById(contributorId)),
    );
    res.status(200).send(users.map((user) => {
      if (!user) return null;
      return user.userName
    }));
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
});

router.post("/:id/contributor", (req, res) => {
  const { projectId } = req.params;
  const { contributorId } = req.body;
  Project.findById(projectId)
    .then((project) => {
      project.contributors.push(contributorId);
      project.save();
      res.status(200).send("Contributor added");
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
