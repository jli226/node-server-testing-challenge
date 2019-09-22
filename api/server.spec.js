const request = require("supertest");

const server = require("./server.js");

describe("server.js", () => {
  describe("GET /", () => {
    it("returns 200 OK", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    // using async/await
    it("should return { message: 'Server is up and running!' }", async () => {
      const res = await request(server).get("/");

      expect(res.body.message).toBe("Server is up and running!");
      expect(res.body).toEqual({ message: "Server is up and running!" });
    });

    // using done
    it("returns JSON", done => {
      request(server)
        .get("/")
        .then(res => {
          expect(res.type).toMatch(/json/i);
          done();
        });
    });
  });
});
