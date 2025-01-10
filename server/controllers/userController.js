// import Utilisateur from "../models/user.js";
// import { createJWT } from "../utils/index.js";
// import Notification from "../models/notification.js";
// import { response } from "express";


// export const registerUser = async (req, res) => {
//     try {
//         // const {name,email,password,isAdmin,role,title} = req.body;
//         const { nom, email, motdepasse, isAdmin, role, titre } = req.body;
//         // const userExist = await Utilisateur.findOne({email});
//         const utilisateurExiste = await Utilisateur.findOne({ email });
//         if (utilisateurExiste) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Cet utilisateur existe déjà"
//             });
//         }
//         const utilisateur = await Utilisateur.create({
//             nom, email, motdepasse, isAdmin, role, titre
//         });
//         if (utilisateur) {
//             isAdmin ? createJWT(res, utilisateur._id) : null;
//             utilisateur.motdepasse = undefined;
//             res.status(201).json(utilisateur);
//         }
//         else {
//             return res.status(400).json({ status: false, message: "Données utilisateur invalides" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// };

// export const loginUser = async (req, res) => {
//     try {
//         const { email, motdepasse } = req.body;
//         const utilisateur = await Utilisateur.findOne({ email });
//         if (!utilisateur) {
//             return res.status(404).json({ status: false, message: error.message });
//         }
//         if (!utilisateur?.isActive) {
//             return registerUser.status(401).json({
//                 status: false,
//                 message: "Le compte d'utilisateur a été désactivé, Veuillez contacter l'administrateur"
//             });
//         }
//         const isMatch = await utilisateur.matchPassword(motdepasse);
//         if (utilisateur && isMatch) {
//             createJWT(res, utilisateur._id);
//             utilisateur.motdepasse = undefined;
//             res.status(200).json(utilisateur);
//         } else {
//             return res.status(401).json({ status: false, message: "Email ou mot de passe invalide" })
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: "Email ou mot de passe invalide" });
//     }
// };

// export const logoutUser = async (req, res) => {
//     try {
//         res.cookie("token", "", {
//             httpOnly: true,
//             expires: new Date(0)
//         });
//         res.status(200).json({ message: "Fermeture de session réussie" })
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// };

// export const getTeamList = async (req, res) => {
//     try {
//         // Fetch users and select specific fields, excluding password
//         const utilisateurs = await Utilisateur.find().select("nom titre role email isActive");

//         // Send the list of users
//         res.status(200).json(utilisateurs);
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({
//             status: false,
//             message: error.message
//         });
//     }
// };

// export const getNotificationsList = async (req, res) => {
//     try {
//         const { userId } = req.utilisateur;
//         const notification = await Notification.find({
//             equipe: userId,
//             notifLu: { $nin: [userId] }
//         }).populate("tache", "titre");
//         res.status(201).json(notification);
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// };

// export const markNotificationRead = async (req, res) => {
//     try {
//         const { userId } = req.utilisateur;
//         const { isReadType, id } = req.query;
//         // if(isReadType==="all")
//         if (isReadType === "tous") {
//             await Notification.updateMany(
//                 { equipe: userId, notifLu: { $nin: [userId] } },
//                 { $push: { notifLu: userId } },
//                 { new: true }
//             );
//         }
//         else {
//             await Notification.findOneAndUpdate({ _id: id, isRead: { $nin: [userId] } }, { $push: { isRead: userId } }, { new: true })
//         }
//         res.status(201).json({ status: true, message: "Accomplie" });
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// }

// export const updateUserProfile = async (req, res) => {
//     try {
//         const { userId, isAdmin } = req.utilisateur;
//         const { _id, nom, email, titre, role } = req.body;
//         const id = isAdmin && userId === _id ? userId : isAdmin && userId !== _id ? _id : userId;
//         const utilisateur = await Utilisateur.findById(id)
//         if (utilisateur) {
//             utilisateur.nom = nom || utilisateur.nom;
//             utilisateur.titre = titre || utilisateur.titre;
//             utilisateur.role = role || utilisateur.role;
//             utilisateur.email = email || utilisateur.email;
//             const modifierUtilisateur = await utilisateur.save();
//             utilisateur.motdepasse = undefined;
//             res.status(201).json({
//                 status: true,
//                 message: "Profile modifié avec succès",
//                 utilisateur: modifierUtilisateur
//             });
//         } else {
//             res.status(404).json({ status: false, message: "Utilisateur non trouvé" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// };

// export const changeUserPassword = async (req, res) => {
//     console.log("Requête de changement de mot de passe reçue");
//     console.log("Corps de la requête:", req.body);
//     console.log("Utilisateur authentifié:", req.utilisateur);
//     try {
//         const { userId } = req.utilisateur;
//         const { motdepasseActuel, motdepasse } = req.body;

//         const utilisateur = await Utilisateur.findById(userId);

//         if (!utilisateur) {
//             return res.status(404).json({
//                 status: false,
//                 message: 'Utilisateur introuvable'
//             });
//         }

//         // Vérifier le mot de passe actuel
//         const isMatch = await utilisateur.matchPassword(motdepasseActuel);

//         if (!isMatch) {
//             return res.status(400).json({
//                 status: false,
//                 message: 'Mot de passe actuel incorrect'
//             });
//         }

//         // Définir le nouveau mot de passe
//         utilisateur.motdepasse = motdepasse;
//         await utilisateur.save();

//         utilisateur.motdepasse = undefined;

//         res.status(200).json({
//             status: true,
//             message: "Mot de passe changé avec succès"
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({
//             status: false,
//             message: error.message
//         });
//     }
// };

// export const activateUserProfile = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const utilisateur = await Utilisateur.findById(id);
//         if (utilisateur) {
//             utilisateur.isActive = req.body.isActive
//             await utilisateur.save();
//             res.status(201).json({
//                 status: true,
//                 message: `Le compte de l'utilisateur a été ${utilisateur?.isActive ? "activé" : "desactivé"
//                     }`
//             });
//         } else {
//             res.status(404).json({ status: false, message: "Utilisateur non trouvé" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// }

// export const deleteUserProfile = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Utilisateur.findByIdAndDelete(id);
//         res.status(200).json({ status: true, message: "Utilisateur supprimé avec succès" });
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// }
import Utilisateur from "../models/user.js";
import { createJWT } from "../utils/index.js";
import Notification from "../models/notification.js";
import { response } from "express";


export const registerUser = async (req, res) => {
    try {
        // const {name,email,password,isAdmin,role,title} = req.body;
        const { nom, email, motdepasse, isAdmin, role, titre } = req.body;
        // const userExist = await Utilisateur.findOne({email});
        const utilisateurExiste = await Utilisateur.findOne({ email });
        if (utilisateurExiste) {
            return res.status(400).json({
                status: false,
                message: "Cet utilisateur existe déjà"
            });
        }
        const utilisateur = await Utilisateur.create({
            nom, email, motdepasse, isAdmin, role, titre
        });
        if (utilisateur) {
            isAdmin ? createJWT(res, utilisateur._id) : null;
            utilisateur.motdepasse = undefined;
            res.status(201).json(utilisateur);
        }
        else {
            return res.status(400).json({ status: false, message: "Données utilisateur invalides" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, motdepasse } = req.body;
        const utilisateur = await Utilisateur.findOne({ email });
        if (!utilisateur) {
            return res.status(404).json({ status: false, message: error.message }); // error is not defined
        }
        if (!utilisateur?.isActive) {
            return registerUser.status(401).json({
                status: false,
                message: "Le compte d'utilisateur a été désactivé, Veuillez contacter l'administrateur"
            });
        }
        const isMatch = await utilisateur.matchPassword(motdepasse);
        if (utilisateur && isMatch) {
            createJWT(res, utilisateur._id);
            utilisateur.motdepasse = undefined;
            res.status(200).json(utilisateur);
        } else {
            return res.status(401).json({ status: false, message: "Email ou mot de passe invalide" })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: "Email ou mot de passe invalide" });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });
        res.status(200).json({ message: "Fermeture de session réussie" })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const getTeamList = async (req, res) => {
    try {
        // Fetch users and select specific fields, excluding password
        const utilisateurs = await Utilisateur.find().select("nom titre role email isActive");

        // Send the list of users
        res.status(200).json(utilisateurs);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
};

export const getNotificationsList = async (req, res) => {
    try {
        const { userId } = req.utilisateur;
        const notification = await Notification.find({
            equipe: userId,
            notifLu: { $nin: [userId] }
        }).populate("tache", "titre");
        res.status(201).json(notification);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

// export const markNotificationRead = async (req, res) => {
//     try {
//         const { userId } = req.utilisateur;
//         const { isReadType, id } = req.query;
//         // if(isReadType==="all")
//         if (isReadType === "tous") {
//             await Notification.updateMany(
//                 { equipe: userId, isRead: { $nin: [userId] } },
//                 { $push: { isRead: userId } },
//                 { new: true }
//             );
//         }
//         else {
//             await Notification.findOneAndUpdate({ _id: id, isRead: { $nin: [userId] } }, { $push: { isRead: userId } }, { new: true })
//         }
//         res.status(201).json({ status: true, message: "Accomplie" });
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// }
export const markNotificationRead = async (req, res) => {
    try {
        const { userId } = req.utilisateur;
        const { isReadType, id } = req.query;
        
        if (isReadType === "tous") {
            await Notification.updateMany(
                { equipe: userId, notifLu: { $nin: [userId] } },
                { $push: { notifLu: userId } },
                { new: true }
            );
        } else {
            await Notification.findOneAndUpdate(
                { _id: id, notifLu: { $nin: [userId] } },
                { $push: { notifLu: userId } },
                { new: true }
            );
        }
        res.status(201).json({ status: true, message: "Accomplie" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { userId, isAdmin } = req.utilisateur;
        const { _id, nom, email, titre, role } = req.body;
        const id = isAdmin && userId === _id ? userId : isAdmin && userId !== _id ? _id : userId;
        const utilisateur = await Utilisateur.findById(id)
        if (utilisateur) {
            utilisateur.nom = nom || utilisateur.nom;
            utilisateur.titre = titre || utilisateur.titre;
            utilisateur.role = role || utilisateur.role;
            utilisateur.email = email || utilisateur.email;
            const modifierUtilisateur = await utilisateur.save();
            utilisateur.motdepasse = undefined;
            res.status(201).json({
                status: true,
                message: "Profile modifié avec succès",
                utilisateur: modifierUtilisateur
            });
        } else {
            res.status(404).json({ status: false, message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const changeUserPassword = async (req, res) => {
    console.log("Requête de changement de mot de passe reçue");
    console.log("Corps de la requête:", req.body);
    console.log("Utilisateur authentifié:", req.utilisateur);
    try {
        const { userId } = req.utilisateur;
        const { motdepasseActuel, motdepasse } = req.body;

        const utilisateur = await Utilisateur.findById(userId);

        if (!utilisateur) {
            return res.status(404).json({
                status: false,
                message: 'Utilisateur introuvable'
            });
        }

        // Vérifier le mot de passe actuel
        const isMatch = await utilisateur.matchPassword(motdepasseActuel);

        if (!isMatch) {
            return res.status(400).json({
                status: false,
                message: 'Mot de passe actuel incorrect'
            });
        }

        // Définir le nouveau mot de passe
        utilisateur.motdepasse = motdepasse;
        await utilisateur.save();

        utilisateur.motdepasse = undefined;

        res.status(200).json({
            status: true,
            message: "Mot de passe changé avec succès"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
};

export const activateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const utilisateur = await Utilisateur.findById(id);
        if (utilisateur) {
            utilisateur.isActive = req.body.isActive
            await utilisateur.save();
            res.status(201).json({
                status: true,
                message: `Le compte de l'utilisateur a été ${utilisateur?.isActive ? "activé" : "desactivé"
                    }`
            });
        } else {
            res.status(404).json({ status: false, message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}

export const deleteUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        await Utilisateur.findByIdAndDelete(id);
        res.status(200).json({ status: true, message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}
