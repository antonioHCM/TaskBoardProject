const router = require("express").Router();
const project = require("../models/project");
const { verifyToken } = require("../validation");

//Crud operations


//GET
router.get("/", (req, res) => {
    project.find()
    .then(data => { res.send(data)})
    .catch(err =>{res.status(500).send( {message: err.message });})
});

//GET by id
router.get("/", (req, res) => {
    project.findById(req.params.id)
    .then(data => { res.send(data)})
    .catch(err =>{res.status(500).send( {message: err.message });})
});

//POST
router.post("/", verifyToken, (req, res) => {
    date = req.body;

    project.create(date)
    .then(data => { res.send(data)})
    .catch(err =>{res.status(500).send( {message: err.message });})
});
//PUT
router.put("/:projectID", verifyToken, (req, res) => {
    const projectID = req.params.projectID;

    project.findByIdAndUpdate(projectID, req.body)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Cannot update Project with id=" + projectID + ".  not found!" });
            else
                res.send({ message: "Project was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating workspace with id=" + projectID });
        });

});
//DELETE 
router.delete("/:projectID",verifyToken, (req, res) => {
    const projectID = req.params.projectID;

    project.findByIdAndDelete(projectID)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Cannot delete the Project with id=" + projectID + ".  not found!" });
            else
                res.send({ message: "Project was deleted successfully." });
        })
        .catch(err => {
            res.status(500).send({ message: "Error deleting Project with id=" + projectID });
        });

});
module.exports = router;