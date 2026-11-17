import { Router } from "express";
import { getAllMateriels, getMaterielById, addMateriel, updateMateriel, deleteMateriel } from "../controllers/materielController.js";
import { verifierToken, autorise } from "../middlewares/auth.js";
import { validerMateriel } from "../middlewares/validateur.js";

const router = Router();

router.get("/", verifierToken, getAllMateriels);
router.get("/:id", verifierToken, getMaterielById);
router.post("/", verifierToken, autorise(["Admin", "Marchandiseur"]), validerMateriel, addMateriel);
router.put("/:id", verifierToken, autorise(["Admin", "Marchandiseur"]), validerMateriel, updateMateriel);
router.delete("/:id", verifierToken, autorise(["Admin"]), deleteMateriel);

export default router;