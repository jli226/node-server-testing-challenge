exports.seed = function(knex, Promise) {
  return knex("heroes").insert([
    { id: 1, name: "Flash" },
    { id: 2, name: "Green Lantern" },
    { id: 3, name: "Wonder Woman" },
    { id: 4, name: "Spider-Man" },
    { id: 5, name: "Iron Man" }
  ]);
};
