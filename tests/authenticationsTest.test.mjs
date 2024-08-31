import supertest from "supertest";
import { web } from "../src/apps/web.mjs";
import { json } from "express";
describe("POST /api/authentications", () => {
  it("should success create authentications", async () => {
    const result = await supertest(web).post("/api/v1/authentications").send({
      username: "A",
      password: "",
    });

    expect(result.statusCode).toBe(201);
    expect(result.body).toBe(json);
  });
});
