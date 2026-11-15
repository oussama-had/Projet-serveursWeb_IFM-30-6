import { Router } from "express";
import { getAllUtilisateurs, getUtilisateurById, addUtilisateur, login, updateUtilisateur, deleteUtilisateur } from "../controllers/utilisateurController.js";

const router = Router();
router.get("/", getAllUtilisateurs);
router.get("/:id", getUtilisateurById);
router.post("/register", addUtilisateur);
router.post("/login", login);
router.put("/:id", updateUtilisateur);
router.delete("/:id", deleteUtilisateur);

export default router;