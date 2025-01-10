import express from 'express';
import { isAdminRoute, protectRoute } from "../middleware/authMiddleware.js";
import { creerTache,supprimerRestorer, tacheSupprimee, modifierTache, creerSousTache, dupliquerTache, posteActiviteTache, statistiquesDashboard, recupererTaches, recupererTache, searchTaches   } from "../controllers/tacheController.js"

const router = express.Router();

router.post("/creer", protectRoute, isAdminRoute, creerTache);
router.post("/dupliquer/:id", protectRoute, isAdminRoute, dupliquerTache);
router.post("/activite/:id", protectRoute, posteActiviteTache);

router.get("/search", protectRoute, searchTaches);
router.get("/dashboard", protectRoute, statistiquesDashboard);
router.get("/", protectRoute, recupererTaches);
router.get("/:id", protectRoute, recupererTache);

router.put("/creer-soustache/:id", protectRoute, isAdminRoute, creerSousTache);
router.put("/modifier/:id", protectRoute, isAdminRoute, modifierTache);
router.put("/:id", protectRoute, isAdminRoute, tacheSupprimee);

router.delete("/supprimer-restorer/:id?", protectRoute, isAdminRoute, supprimerRestorer);

export default router;