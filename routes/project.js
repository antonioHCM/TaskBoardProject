const router = require("express").Router();
const Project = require("../models/project");
const Column = require("../models/column")
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
            // Get user ID from token 
            const userId = req.user.id; 
        
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

    // GET column by project ID
router.get("/:id/columns", verifyToken, async (req, res) => {
    const id = req.params.id;
  
    try {
      const columns = await Column.find({ project: id });
  
      if (!columns || columns.length === 0) {
        return res.status(404).send({ message: "Columns for project id=" + id + " not found" });
      }
  
      res.send(columns);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });

// POST create a new project
router.post("/", verifyToken, (req, res) => {
    const projectData = req.body;

    Project.create(projectData)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
});

// POST create a new project
router.post("/newProject", verifyToken, async (req, res) => {
  try {
    const { name, owner , contributors } = req.body;

    // Create a new project instance
    const newProject = new Project({
      name,
      owner, 
      contributors,
    });

    await newProject.save();
    
    res.status(201).json({ message: 'Project created successfully', projectID: newProject._id});
  } catch (error) {
    // Handle errors
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Failed to create project' });
  }
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
