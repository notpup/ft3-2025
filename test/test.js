import request from "supertest";
import server from "../server.js";

console.log(process.env)
describe("GET /api/test", () => {
  it("debería responder con 200", async () => {
    const res = await request(server).get("/api/community/");
    expect(res.statusCode).toBe(200);
  });
});
