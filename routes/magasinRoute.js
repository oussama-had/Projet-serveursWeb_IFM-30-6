import { Router } from "express";
import { getAllMagasins, getMagasinById, addMagasin, updateMagasin, deleteMagasin } from "../controllers/magasinController.js";

const router = Router();
router.get("/", getAllMagasins);
router.get("/:id", getMagasinById);
router.post("/", addMagasin);
router.put("/:id", updateMagasin);
router.delete("/:id", deleteMagasin);

export default router;