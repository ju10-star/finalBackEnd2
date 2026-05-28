import request from "supertest";
import app from "../src/app.js";

describe("Adoption Router", () => {
  it("GET /adoption debería devolver listado", async () => {
    const res = await request(app).get("/adoption");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("POST /adoption debería crear adopción válida", async () => {
    const res = await request(app)
      .post("/adoption")
      .send({ petId: "123", userId: "456" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("adoptionId");
  });

  it("POST /adoption debería fallar si faltan datos", async () => {
    const res = await request(app).post("/adoption").send({});
    expect(res.statusCode).toBe(400);
  });

  it("POST /adoption debería fallar si falta el campo 'petId'", async () => {
  const res = await request(app).post("/adoption").send({
    adopterName: "Juan Pérez"
    // falta petId
  });
  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("error");
});

it("GET /adoption/:id debería devolver 404 si el ID no existe", async () => {
  const res = await request(app).get("/adoption/999999");
  expect(res.statusCode).toBe(404);
  expect(res.body).toHaveProperty("error");
});

it("PUT /adoption/:id debería actualizar correctamente una adopción", async () => {
  const nueva = await request(app).post("/adoption").send({
    petId: "123",
    adopterName: "Ana"
  });

  const res = await request(app)
    .put(`/adoption/${nueva.body.id}`)
    .send({ adopterName: "Ana Gómez" });

  expect(res.statusCode).toBe(200);
  expect(res.body.adopterName).toBe("Ana Gómez");
});

it("DELETE /adoption/:id debería eliminar una adopción existente", async () => {
  const nueva = await request(app).post("/adoption").send({
    petId: "456",
    adopterName: "Carlos"
  });

  const res = await request(app).delete(`/adoption/${nueva.body.id}`);
  expect(res.statusCode).toBe(200);

  // Verificamos que ya no exista
  const check = await request(app).get(`/adoption/${nueva.body.id}`);
  expect(check.statusCode).toBe(404);
});


});
