const router = require("express").Router();
const Column = require("../models/column");
const Row = require("../models/row");
const { verifyToken } = require("../validation");

// GET all columns
router.get("/", (req, res) => {
    Column.find()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
});

// GET column by ID
router.get("/:id", (req, res) => {
    const id = req.params.id;

    Column.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Column with id=" + id + " not found" });
            else
                res.send(data);
        })
        .catch(err => res.status(500).send({ message: err.message }));
});
router.get("/:id/rows", verifyToken, async (req, res) => {
    const id = req.params.id;
  
    try {
      const rows = await Row.find({ column: id });
  
      if (!rows || rows.length === 0) {
        return res.status(404).send({ message: "Row for project id=" + id + " not found" });
      }
  
      res.send(rows);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });

// POST create a new column
router.post("/", verifyToken, (req, res) => {
    const columnData = req.body;

    Column.create(columnData)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
});

// PUT update a column by ID
router.put("/:id", verifyToken, (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    Column.findByIdAndUpdate(id, newData)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Column with id=" + id + " not found" });
            else
                res.send({ message: "Column with id=" + id + " was updated successfully" });
        })
        .catch(err => res.status(500).send({ message: err.message }));
});

// DELETE delete a column by ID
router.delete("/:id", verifyToken, (req, res) => {
    const id = req.params.id;

    Column.findByIdAndDelete(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Column with id=" + id + " not found" });
            else
                res.send({ message: "Column with id=" + id + " was deleted successfully" });
        })
        .catch(err => res.status(500).send({ message: err.message }));
});

module.exports = router;
