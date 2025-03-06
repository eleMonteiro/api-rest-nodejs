import request from "supertest";
import express, { json } from "express";
import { create, remove, findAll, findByUser, findById } from "@controllers/demandController";
import { create as _create, remove as _remove, findAll as _findAll, findByUser as _findByUser, findById as _findById } from "@services/demandService";

const app = express();
app.use(json());

app.post("/demand", create);
app.delete("/demand/:id", remove);
app.get("/demand", findAll);
app.get("/demand/user", findByUser);
app.get("/demand/:id", findById);

jest.mock("@services/demandService");

const mockDemand = {
  total: 7.5,
  address: "Rua Test. 123",
  dateOfDemand: "2025-02-27",
  user: { id: 1 },
  itens: [{ amount: 1, totalPrice: 2.5, dish: { id: 1 } }],
};

describe("Demand Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("POST /demand - Should create a demand", async () => {
    _create.mockResolvedValue(mockDemand);

    const response = await request(app)
      .post("/demand")
      .send(mockDemand);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockDemand);
    expect(_create).toHaveBeenCalledWith(mockDemand);
  });

  test("DELETE /demand/:id - Should remove a demand", async () => {
    _remove.mockResolvedValue();

    const response = await request(app).delete("/demand/1");

    expect(response.status).toBe(204);
    expect(_remove).toHaveBeenCalledWith("1");
  });

  test("GET /demand - Should return all demands", async () => {
    const mockDemands = [{ id: 1, name: "Test Demand" }];
    _findAll.mockResolvedValue(mockDemands);

    const response = await request(app).get("/demand");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDemands);
    expect(_findAll).toHaveBeenCalled();
  });

  test("GET /demand/user?userId=123 - Should return demands by user", async () => {
    const mockDemands = [{ id: 1, name: "User Demand" }];
    _findByUser.mockResolvedValue(mockDemands);

    const response = await request(app).get("/demand/user?userId=123");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDemands);
    expect(_findByUser).toHaveBeenCalledWith("123");
  });

  test("GET /demand/:id - Should return a demand by ID", async () => {
    const mockDemand = { id: 1, name: "Test Demand" };
    _findById.mockResolvedValue(mockDemand);

    const response = await request(app).get("/demand/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDemand);
    expect(_findById).toHaveBeenCalledWith("1");
  });

  test("GET /demand/:id - Should return 404 error if demand does not exist", async () => {
    _findById.mockResolvedValue(null);

    const response = await request(app).get("/demand/99");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Demand not found" });
  });

  test("GET /demand/user without userId - Should return 400 error", async () => {
    const response = await request(app).get("/demand/user");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "'userId' parameter is required",
    });
  });
});
