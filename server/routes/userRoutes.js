import express from 'express';

import {registerUser,loginUser,logoutUser,getTeamList,getNotificationsList,updateUserProfile,markNotificationRead, changeUserPassword,activateUserProfile,deleteUserProfile} from "../controllers/userController.js"

import { isAdminRoute, protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/get-equipe", protectRoute, isAdminRoute, getTeamList);
router.get("/notifications", protectRoute, getNotificationsList);

router.put("/profil", protectRoute, updateUserProfile);
router.put("/lire-notif", protectRoute, markNotificationRead);
router.put("/changer-motdepasse", protectRoute, changeUserPassword);

// Admin routes

router
    .route('/:id')
    .put(protectRoute, isAdminRoute, activateUserProfile)
    .delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router;