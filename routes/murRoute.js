import { Router } from "express";
import { getAllMurs, getMurById, addMur, updateMur, deleteMur } from "../controllers/murController.js";
import upload from "../middlewares/upload.js";

const router = Router();
router.get("/", getAllMurs);
router.get("/:id", getMurById);
router.post("/", upload.single("photo"), addMur);
router.put("/:id", upload.single("photo"), updateMur);
router.delete("/:id", deleteMur);

export default router;