import Utilisateur from "../models/user.js";
import { createJWT } from "../utils/index.js";
import Notification from "../models/notification.js";
import { response } from "express";
import bcrypt from 'bcrypt';
import { sendEmail } from '../utils/email.js'


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
            // Send an email to the user
            const subject = "Votre compte a été créé";
            const message = `
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
                    <h2 style="color: #4CAF50; text-align: center;">Bonjour ${utilisateur.nom},</h2>
                    <p style="font-size: 16px; color: #555; text-align: center;">Votre compte dans le gestionnaire de tâches BAN a été créé avec succès.</p>
                    <p style="font-size: 16px; color: #555; text-align: center;">
                        Afin de sécuriser votre compte, veuillez changer votre mot de passe dans les paramètres de votre compte dès que possible. 
                    </p>
                    <p style="font-size: 16px; color: #555; text-align: center;">
                        <a href="https://votre-app.com/settings" style="color: #4CAF50; text-decoration: none;">Cliquez ici pour modifier votre mot de passe</a>
                    </p>
                    <p style="font-size: 16px; color: #555; text-align: center;">
                        Si vous avez des questions ou avez besoin d'aide, n'hésitez pas à nous contacter.
                    </p>
                    <p style="font-size: 16px; color: #555; text-align: center;">
                        Cordialement,<br>
                        L'équipe BAN Task Manager
                    </p>
                </div>
            `;

            await sendEmail(utilisateur.email, subject, message);   
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
            // res.status(200).json(utilisateur);
            res.status(200).json({
                ...utilisateur._doc,
                shouldRefresh: utilisateur.isAdmin // Added this line to indicate refresh needed
            });
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

        // Send email after successful password change
        const subject = "Votre mot de passe a été changé";
        const message = `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
                <h2 style="color: #4CAF50; text-align: center;">Bonjour ${utilisateur.nom},</h2>
                <p style="font-size: 16px; color: #555; text-align: center;">
                    Nous vous informons que votre mot de passe a été modifié avec succès.
                </p>
                <p style="font-size: 16px; color: #555; text-align: center;">
                    Si vous n'êtes pas à l'origine de cette modification, veuillez contacter immédiatement notre support.
                </p>
                <p style="font-size: 16px; color: #555; text-align: center;">
                    Cordialement,<br>
                    L'équipe BAN Task Manager
                </p>
            </div>
        `;
        await sendEmail(utilisateur.email, subject, message);

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
            const previousStatus = utilisateur.isActive; // Store the previous status before updating
            utilisateur.isActive = req.body.isActive;
            await utilisateur.save();

            // Prepare the subject and message dynamically based on the status
            let subject, message;

            if (utilisateur.isActive && previousStatus !== utilisateur.isActive) {
                // Account has been activated
                subject = "Votre compte a été activé";
                message = `
                    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
                        <h2 style="color: #4CAF50; text-align: center;">Bonjour ${utilisateur.nom},</h2>
                        <p style="font-size: 16px; color: #555; text-align: center;">
                            Félicitations ! Votre compte a été activé avec succès.
                        </p>
                        <p style="font-size: 16px; color: #555; text-align: center;">
                            Vous pouvez maintenant accéder à toutes les fonctionnalités de notre plateforme.
                        </p>
                        <p style="font-size: 16px; color: #555; text-align: center;">
                            Si vous avez des questions ou avez besoin d'aide, n'hésitez pas à nous contacter.
                        </p>
                        <p style="font-size: 16px; color: #555; text-align: center;">
                            Cordialement,<br>
                            L'équipe BAN Task Manager
                        </p>
                    </div>
                `;
            } else if (!utilisateur.isActive && previousStatus !== utilisateur.isActive) {
                // Account has been deactivated
                subject = "Votre compte a été désactivé";
                message = `
                    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
                        <h2 style="color: #F44336; text-align: center;">Bonjour ${utilisateur.nom},</h2>
                        <p style="font-size: 16px; color: #555; text-align: center;">
                            Nous vous informons que votre compte a été désactivé. Si vous pensez qu'il s'agit d'une erreur, n'hésitez pas à nous contacter.
                        </p>
                        <p style="font-size: 16px; color: #555; text-align: center;">
                            Si vous souhaitez réactiver votre compte, veuillez contacter notre support.
                        </p>
                        <p style="font-size: 16px; color: #555; text-align: center;">
                            Cordialement,<br>
                            L'équipe BAN Task Manager
                        </p>
                    </div>
                `;
            }

            // Send the email only if the status has changed
            if (subject && message) {
                await sendEmail(utilisateur.email, subject, message);
            }

            res.status(201).json({
                status: true,
                message: `Le compte de l'utilisateur a été ${utilisateur?.isActive ? "activé" : "désactivé"}`
            });
        } else {
            res.status(404).json({ status: false, message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};



export const deleteUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const utilisateur = await Utilisateur.findById(id);

        if (utilisateur) {
            // Send email before deleting the user
            const subject = "Votre compte a été supprimé";
            const message = `
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
                    <h2 style="color: #F44336; text-align: center;">Bonjour ${utilisateur.nom},</h2>
                    <p style="font-size: 16px; color: #555; text-align: center;">
                        Nous vous informons que votre compte a été supprimé de notre plateforme.
                    </p>
                    <p style="font-size: 16px; color: #555; text-align: center;">
                        Si vous pensez qu'il s'agit d'une erreur ou si vous avez des questions, veuillez nous contacter.
                    </p>
                    <p style="font-size: 16px; color: #555; text-align: center;">
                        Cordialement,<br>
                        L'équipe BAN Task Manager
                    </p>
                </div>
            `;
            await sendEmail(utilisateur.email, subject, message);

            // Proceed with deleting the user
            await Utilisateur.findByIdAndDelete(id);
            res.status(200).json({ status: true, message: "Utilisateur supprimé avec succès" });
        } else {
            res.status(404).json({ status: false, message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};
