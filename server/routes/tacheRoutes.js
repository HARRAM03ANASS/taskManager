import express from 'express';
import { isAdminRoute, protectRoute } from "../middleware/authMiddleware.js";
import { creerTache,supprimerRestorer, tacheSupprimee, modifierTache, creerSousTache, dupliquerTache, posteActiviteTache, statistiquesDashboard, recupererTaches, recupererTache, searchTaches, getTachesForUser   } from "../controllers/tacheController.js"
const router = express.Router();
import mongoose from 'mongoose';
// const express = require('express');

router.post("/creer", protectRoute, isAdminRoute, creerTache);
router.post("/dupliquer/:id", protectRoute, isAdminRoute, dupliquerTache);
router.post("/activite/:id", protectRoute, posteActiviteTache);

router.get("/search", protectRoute, searchTaches);
router.get("/dashboard", protectRoute, statistiquesDashboard);
router.get("/", protectRoute, recupererTaches);
router.get("/user/:userId", getTachesForUser);
router.get("/:id", protectRoute, recupererTache);








// Add this near the top of your routes, before other routes
router.get("/test", (req, res) => {
    console.log("Test route hit!");
    res.json({ message: "Test route working" });
});
// router.get('/:userId',protectRoute, getTachesForUser);

// Route to fetch tasks by userId
// router.get("/tasks/user/:userId", async (req, res) => {
//     try {
//       const { userId } = req.params;
      
//       // Convert userId to ObjectId if it's not already
//       const tasks = await Tache.find({ equipe: { $in: [ObjectId(userId)] } });
      
//       res.status(200).json(tasks);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//       res.status(500).json({ error: "Failed to fetch tasks" });
//     }
//   });

// router.get("/tasks/user/:userId", getTachesForUser);





router.put("/creer-soustache/:id", protectRoute, isAdminRoute, creerSousTache);
router.put("/modifier/:id", protectRoute, isAdminRoute, modifierTache);
router.put("/:id", protectRoute, isAdminRoute, tacheSupprimee);
router.delete("/supprimer-restorer/:id?", protectRoute, isAdminRoute, supprimerRestorer);



export default router;