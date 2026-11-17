import { Router } from "express";
import { getAllUtilisateurs, getUtilisateurById, addUtilisateur, login, updateUtilisateur, deleteUtilisateur } from "../controllers/utilisateurController.js";
import { verifierToken, autorise } from "../middlewares/auth.js";
import { validerUtilisateur, validerLogin } from "../middlewares/validateur.js";

const router = Router();

router.post("/register", validerUtilisateur, addUtilisateur);
router.post("/login", validerLogin, login);
router.get("/", verifierToken, autorise(["Admin"]), getAllUtilisateurs);
router.get("/:id", verifierToken, getUtilisateurById);
router.put("/:id", verifierToken, validerUtilisateur, updateUtilisateur);
router.delete("/:id", verifierToken, autorise(["Admin"]), deleteUtilisateur);

export default router;