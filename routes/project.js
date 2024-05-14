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
// GET project by UserID
router.get("/user/:id", verifyToken, async (req, res) => {
    try {
        // Get user ID from token (you need to implement this)
        const userId = req.user.id; // Assuming you have middleware to extract user ID from token
        
        // Query database to find projects where the user is either the owner or a contributor
        const projects = await Project.find({
          $or: [
            { owner: userId },
            { 'contributors.user': userId }
          ]
        });
    
        // Return the projects found
        res.json(projects);
      } catch (error) {
        console.error('Error fetching user projects:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
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
