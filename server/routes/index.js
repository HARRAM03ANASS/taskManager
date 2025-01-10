import express from 'express';
import userRoutes from "./userRoutes.js";
import tacheRoutes from "./tacheRoutes.js";

const router = express.Router();

router.use("/utilisateur",userRoutes);
router.use("/tache",tacheRoutes);

export default router;