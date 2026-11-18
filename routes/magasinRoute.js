import { Router } from "express";
import { getAllMagasins, getMagasinById, addMagasin, updateMagasin, deleteMagasin } from "../controllers/magasinController.js";
import { verifierToken, autorise } from "../middlewares/auth.js";
import { validerMagasin } from "../middlewares/validateur.js";

const router = Router();

router.get("/", verifierToken, getAllMagasins);
router.get("/:id", verifierToken, getMagasinById);
router.post("/", verifierToken, autorise(["Admin"]), validerMagasin, addMagasin);
router.put("/:id", verifierToken, autorise(["Admin"]), validerMagasin, updateMagasin);
router.delete("/:id", verifierToken, autorise(["Admin"]), deleteMagasin);

export default router;