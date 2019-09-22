const Heroes = require("./heroes-model.js");
const db = require("../data/db-config.js");

describe("heroes model", () => {
  beforeEach(async () => {
    await db("heroes").truncate();
  });

  describe("addHero()", () => {
    it("should add heroes into the db", async () => {
      await Heroes.addHero({ name: "Superman" });
      await Heroes.addHero({ name: "Batman" });

      let heroes = await db("heroes");

      expect(heroes).toHaveLength(2);
    });

    it("should add hero into the db", async () => {
      const [id] = await Heroes.addHero({ name: "Superman" });

      let hero = await db("heroes")
        .where({ id })
        .first();

      expect(hero.name).toBe("Superman");
    });
  });

  describe("deleteHero()", () => {
    it("should delete a hero from the db", async () => {
      const [id] = await Heroes.addHero({ name: "Superman" });

      let heroes = await db("heroes");

      expect(heroes).toHaveLength(1);

      await Heroes.deleteHero(id);

      heroes = await db("heroes");

      expect(heroes).toHaveLength(0);
    });
  });
});
