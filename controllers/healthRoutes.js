const express = require("express");
const router = express.Router();

const Health = require("../models/health");

// GET route - get all health records from the database
router.get("/", async (req, res) => {
  try {
    const response = await Health.find();

    res.send(JSON.stringify({ msg: "success", msg: response }));
  } catch (e) {
    console.log(e);
  }
});

// POST route - add a health record from the database
router.post("/", async (req, res, next) => {
  console.log(req.body);

  let { status, type } = req.body;

  let data = {
    status,
    type,
  };

  try {
    const response = await Health.create(data);

    res.send(JSON.stringify({ msg: "success", msg: response }));
  } catch (e) {
    console.log(e);
  }
});

// DELETE route - delete a specific version of the database
router.delete("/:id", async (req, res, next) => {
  var sid = req.params["id"];

  const response = await Health.deleteOne({ _id: sid });

  res.send(JSON.stringify({ msg: "success", msg: response }));
});

// PUT route - update a specific version of the database
router.put("/:id", async (req, res, next) => {
  try {
    const response = await Health.updateOne(
      { id: req.params.id },
      {
        $set: {
          status: req.body.status,
          type: req.body.status,
        },
      }
    );

    res.json(response);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
