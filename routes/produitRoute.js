import { Router } from "express";
import { getAllProduits, getProduitById, addProduit, updateProduit, deleteProduit } from "../controllers/produitController.js";
import { verifierToken, autorise } from "../middlewares/auth.js";
import { validerProduit } from "../middlewares/validateur.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.get("/", verifierToken, getAllProduits);
router.get("/:id", verifierToken, getProduitById);
router.post("/", verifierToken, autorise(["Admin", "Marchandiseur"]), upload.single("photo"), validerProduit, addProduit);
router.put("/:id", verifierToken, autorise(["Admin", "Marchandiseur"]), upload.single("photo"), validerProduit, updateProduit);
router.delete("/:id", verifierToken, autorise(["Admin"]), deleteProduit);

export default router;