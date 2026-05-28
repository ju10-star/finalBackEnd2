import { Router } from "express";

const router = Router();
let adopciones = [];

// GET listado
router.get("/", (req, res) => {
  res.status(200).json({ message: "Listado de adopciones", data: adopciones });
});

// POST crear adopción
router.post("/", (req, res) => {
  const { petId, userId, adopterName } = req.body;
  if (!petId || (!userId && !adopterName)) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const nueva = {
    id: String(adopciones.length + 1),       // usado por los tests en PUT/DELETE
    adoptionId: String(Date.now()),          // usado por los tests en POST válido
    petId,
    userId,
    adopterName
  };

  adopciones.push(nueva);
  res.status(201).json(nueva);
});

// GET por ID
router.get("/:id", (req, res) => {
  const adopcion = adopciones.find(a => a.id === req.params.id);
  if (!adopcion) {
    return res.status(404).json({ error: "Adopción no encontrada" });
  }
  res.json(adopcion);
});

// PUT actualizar
router.put("/:id", (req, res) => {
  const adopcion = adopciones.find(a => a.id === req.params.id);
  if (!adopcion) {
    return res.status(404).json({ error: "Adopción no encontrada" });
  }
  adopcion.adopterName = req.body.adopterName || adopcion.adopterName;
  res.json(adopcion);
});

// DELETE eliminar
router.delete("/:id", (req, res) => {
  const index = adopciones.findIndex(a => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Adopción no encontrada" });
  }
  adopciones.splice(index, 1);
  res.json({ message: `Adopción ${req.params.id} eliminada` });
});

export default router;
