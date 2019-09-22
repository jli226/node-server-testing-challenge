const request = require("supertest");

const db = require("../data/db-config.js");
const Heroes = require("./heroes-model.js");

const server = require("../api/server.js");

describe("heroes-router.js", () => {
  beforeEach(async () => {
    await db("heroes").truncate();
  });

  describe("GET /api/heroes", () => {
    it("responds with 200 OK", async () => {
      const res = await request(server).get("/api/heroes");
      expect(res.status).toBe(200);
    });

    it("responds with JSON", async () => {
      const res = await request(server).get("/api/heroes");
      expect(res.type).toMatch(/json/i);
    });
  });

  describe("POST /api/heroes", () => {
    it("responds with 201 OK", async () => {
      await request(server)
        .post("/api/heroes")
        .send({ name: "Hulk" })
        .send({ name: "Spider-Man" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it("responds with JSON", async () => {
      const res = await request(server)
        .post("/api/heroes")
        .send({ name: "Hulk" });
      expect(res.type).toMatch(/json/i);
    });

    it("adds a hero to the db", async () => {
      let heroes = await db("heroes");

      expect(heroes).toHaveLength(0);

      await request(server)
        .post("/api/heroes")
        .send({ name: "Hulk" });

      heroes = await db("heroes");

      expect(heroes).toHaveLength(1);
    });
  });

  describe("DELETE /api/heroes/:id", () => {
    it("responds with 200 OK", async () => {
      await Heroes.addHero({ name: "Hulk" });

      await request(server)
        .delete("/api/heroes/1")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("deletes a hero", async () => {
      await Heroes.addHero({ name: "Hulk" });

      let heroes = await db("heroes");

      expect(heroes).toHaveLength(1);

      await request(server).delete("/api/heroes/1");

      heroes = await db("heroes");

      expect(heroes).toHaveLength(0);
    });
  });
});
