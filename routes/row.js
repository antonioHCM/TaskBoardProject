const router = require("express").Router();
const Row = require("../models/row");
const { verifyToken } = require("../validation");

// GET all rows
router.get("/", (req, res) => {
    Row.find()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
});

// GET row by ID
router.get("/:id", (req, res) => {
    const id = req.params.id;

    Row.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Row with id=" + id + " not found" });
            else
                res.send(data);
        })
        .catch(err => res.status(500).send({ message: err.message }));
});
// POST create a new row
router.post("/", verifyToken, (req, res) => {
    const rowData = req.body;

    Row.create(rowData)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
});

// PUT update a row by ID
router.put("/:id", verifyToken, (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    Row.findByIdAndUpdate(id, newData)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Row with id=" + id + " not found" });
            else
                res.send({ message: "Row with id=" + id + " was updated successfully" });
        })
        .catch(err => res.status(500).send({ message: err.message }));
});

// DELETE delete a row by ID
router.delete("/:id", verifyToken, (req, res) => {
    const id = req.params.id;

    Row.findByIdAndDelete(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Row with id=" + id + " not found" });
            else
                res.send({ message: "Row with id=" + id + " was deleted successfully" });
        })
        .catch(err => res.status(500).send({ message: err.message }));
});

module.exports = router;
