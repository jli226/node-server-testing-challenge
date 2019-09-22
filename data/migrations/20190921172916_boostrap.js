exports.up = function(knex) {
  return knex.schema.createTable("heroes", heroes => {
    heroes.increments();

    heroes
      .string("name", 128)
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("heroes");
};
