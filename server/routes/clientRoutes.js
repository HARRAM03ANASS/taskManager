import express from 'express';
import { isAdminRoute, protectRoute } from "../middleware/authMiddleware.js";
import { creerClient, recupererClients, modifierClient, supprimerClient } from "../controllers/clientController.js";

const router = express.Router();

// Routes pour les clients
router.post("/creer", protectRoute, isAdminRoute, creerClient);
router.get("/", protectRoute, recupererClients);
router.put("/modifier/:id", protectRoute, isAdminRoute, modifierClient);
router.delete("/supprimer/:id", protectRoute, isAdminRoute, supprimerClient);



export default router;