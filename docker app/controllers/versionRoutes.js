const express = require("express");
const router = express.Router();

const Versions = require("../models/version");

// GET route - get all versions from the database
router.get("/", async (req, res) => {
  try {
    const response = await Versions.find();

    res.send(JSON.stringify({ msg: "success", msg: response }));
  } catch (e) {
    console.log(e);
  }
});

// POST route - add a version from the database
router.post("/", async (req, res, next) => {
  console.log(req.body);

  let { name, group, status } = req.body;

  let data = {
    name,
    group,
    status,
  };

  try {
    const response = await Versions.create(data);

    res.send(JSON.stringify({ msg: "success", msg: response }));
  } catch (e) {
    console.log(e);
  }
});

// DELETE route - delete a specific version of the database
router.delete("/:id", async (req, res, next) => {
  var sid = req.params["id"];

  const response = await Versions.deleteOne({ _id: sid });

  res.send(JSON.stringify({ msg: "success", msg: response }));
});

// PUT route - update a specific version of the database
router.put("/:id", async (req, res, next) => {
  try {
    const response = await Versions.updateOne(
      { id: req.params.id },
      {
        $set: {
          name: req.body.name,
          group: req.body.group,
          status: req.body.status,
        },
      }
    );

    res.json(response);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
