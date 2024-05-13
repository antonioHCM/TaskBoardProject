const router = require("express").Router();
const Project = require("../models/project");
const { verifyToken } = require("../validation");

// GET all projects
router.get("/", (req, res) => {
    Project.find()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
});

// GET project by ID
router.get("/:id", verifyToken, (req, res) => {
    const projectId = req.params.id;

    Project.findById(projectId)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Project with id=" + projectId + " not found" });
            else
                res.send(data);
        })
        .catch(err => res.status(500).send({ message: err.message }));
});

// POST create a new project
router.post("/", verifyToken, (req, res) => {
    const projectData = req.body;

    Project.create(projectData)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
});

// PUT update a project by ID
router.put("/:projectId", verifyToken, (req, res) => {
    const projectId = req.params.projectId;
    const newData = req.body;

    Project.findByIdAndUpdate(projectId, newData)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Project with id=" + projectId + " not found" });
            else
                res.send({ message: "Project with id=" + projectId + " was updated successfully" });
        })
        .catch(err => res.status(500).send({ message: err.message }));
});

// DELETE delete a project by ID
router.delete("/:projectId", verifyToken, (req, res) => {
    const projectId = req.params.projectId;

    Project.findByIdAndDelete(projectId)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Project with id=" + projectId + " not found" });
            else
                res.send({ message: "Project with id=" + projectId + " was deleted successfully" });
        })
        .catch(err => res.status(500).send({ message: err.message }));
});

module.exports = router;
