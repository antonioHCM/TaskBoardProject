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

//Get  rows by column ID
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
//Post add row to columnID
  router.post('/:id/rows', verifyToken, async (req, res) => {
    const id = req.params.id;

    const newRow = new Row({
        column: id,
        description: req.body.description,
        position: req.body.position,
        content: req.body.content
      });
      try {
        // Save the new row to the database
        const savedRow = await newRow.save();
        res.status(201).json(savedRow);
      } catch (err) {
        // Handle errors if row validation fails
        res.status(400).json({ message: err.message });
      }
      
    });

// POST create a new column by projectID
router.post('/newColumn', verifyToken, async (req, res) => {
  try {
      const { name, project, position } = req.body;

      // Create a new column instance
      const newColumn = new Column({
          name,
          project,
          position
      });

      await newColumn.save();

      res.status(201).json({ message: 'Column created successfully', column: newColumn });
  } catch (error) {
      // Handle errors
      console.error('Error creating column:', error);
      res.status(500).json({ message: 'Failed to create column' });
  }
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
