import { Router } from "express";
import { getAllProduits, getProduitById, addProduit, updateProduit, deleteProduit } from "../controllers/produitController.js";
import upload from "../middlewares/upload.js";

const router = Router();
router.get("/", getAllProduits);
router.get("/:id", getProduitById);
router.post("/", upload.single("photo"), addProduit);
router.put("/:id", upload.single("photo"), updateProduit);
router.delete("/:id", deleteProduit);

export default router;