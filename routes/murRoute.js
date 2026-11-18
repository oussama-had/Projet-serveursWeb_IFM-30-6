import { Router } from "express";
import { getAllMurs, getMurById, addMur, updateMur, deleteMur } from "../controllers/murController.js";
import { verifierToken, autorise } from "../middlewares/auth.js";
import { validerMur } from "../middlewares/validateur.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.get("/", verifierToken, getAllMurs);
router.get("/:id", verifierToken, getMurById);
router.post("/", verifierToken, autorise(["Admin", "Marchandiseur"]), upload.single("photo"), validerMur, addMur);
router.put("/:id", verifierToken, autorise(["Admin", "Marchandiseur"]), upload.single("photo"), validerMur, updateMur);
router.delete("/:id", verifierToken, autorise(["Admin"]), deleteMur);

export default router;