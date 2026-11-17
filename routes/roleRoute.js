import { Router } from "express";
import { getAllRoles, getRoleById, addRole, updateRole, deleteRole } from "../controllers/roleController.js";
import { verifierToken, autorise } from "../middlewares/auth.js";
import { validerRole } from "../middlewares/validateur.js";

const router = Router();

router.get("/", getAllRoles);
router.get("/:id", getRoleById);
router.post("/", validerRole, addRole); // Laisser ouvert au départ pour créer "Admin" et "Marchandiseur"
router.put("/:id", verifierToken, autorise(["Admin"]), validerRole, updateRole);
router.delete("/:id", verifierToken, autorise(["Admin"]), deleteRole);

export default router;