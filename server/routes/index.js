import express from 'express';
import userRoutes from "./userRoutes.js";
import tacheRoutes from "./tacheRoutes.js";
import clientRoutes from "./clientRoutes.js";

const router = express.Router();

router.use("/utilisateur",userRoutes);
router.use("/tache",tacheRoutes);
router.use("/client",clientRoutes);
export default router;