const db = require("../data/db-config.js");

module.exports = {
  getHeroes,
  addHero,
  deleteHero
};

function getHeroes() {
  return db("heroes");
}

function addHero(hero) {
  return db("heroes").insert(hero, "id");
}

function deleteHero(id) {
  return db("heroes")
    .where("id", id)
    .delete();
}
