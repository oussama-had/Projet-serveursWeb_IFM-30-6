import { Router } from "express";
import { getAllMateriels, getMaterielById, addMateriel, updateMateriel, deleteMateriel } from "../controllers/materielController.js";

const router = Router();
router.get("/", getAllMateriels);
router.get("/:id", getMaterielById);
router.post("/", addMateriel);
router.put("/:id", updateMateriel);
router.delete("/:id", deleteMateriel);

export default router;