const express = require("express");

const Heroes = require("./heroes-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  Heroes.getHeroes()
    .then(heroes => {
      res.status(200).json(heroes);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while getting all heroes.", err });
    });
});

router.post("/", (req, res) => {
  const hero = req.body;

  Heroes.addHero(hero)
    .then(hero => {
      res.status(201).json(hero);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while adding a hero.", err });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Heroes.deleteHero(id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while deleting a hero.", err });
    });
});

module.exports = router;
