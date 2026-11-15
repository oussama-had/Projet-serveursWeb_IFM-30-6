import { Router } from "express";
import { getAllRoles, getRoleById, addRole, updateRole, deleteRole } from "../controllers/roleController.js";

const router = Router();
router.get("/", getAllRoles);
router.get("/:id", getRoleById);
router.post("/", addRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

export default router;