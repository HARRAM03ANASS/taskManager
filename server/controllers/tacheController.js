// import Tache from "../models/tache.js";
// import Utilisateur from "../models/user.js";
// import Notification from "../models/notification.js";
// import { sendEmail } from '../utils/email.js' 


// export const creerTache = async (req, res) => {
//     try {
//       const { userId } = req.utilisateur;
//       const { titre, equipe, phase, date, priorite, atouts, description } = req.body;
//       let text = "Une nouvelle tâche vous a été assignée";
//       if (equipe?.length > 1) {
//         text = text + `et ${equipe?.length - 1} autres`;
//       }
//       text =
//         text +
//         `La priorité de la tâche est définie comme étant de ${priorite}, veuillez vérifier et agir. La date de la tâche est ${new Date(date).toDateString()}. Merci en avance !`;

//         let nomsUtilisateurs = '';

//         const utilisateurs = await Utilisateur.find({ _id: { $in: equipe } });

//         nomsUtilisateurs = utilisateurs.map(u => u.nom).join(', ');

//         const tache = await Tache.create({
//         titre,
//         equipe,
//         phase: phase,
//         date,
//         priorite: priorite,
//         atouts,
//         description,
//       });


//       for (let memberId of equipe) {
//         const utilisateur = await Utilisateur.findById(memberId);
//         if (utilisateur && utilisateur.email) {
//             const subject = `Nouvelle tâche assignée: ${titre}`;

//             const message = `
//                 <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
//                     <h2 style="color: #4CAF50; text-align: center;">Bonjour ${utilisateur.nom},</h2>
//                     <p style="font-size: 16px; color: #555; text-align: center;">Une nouvelle tâche vous a été assignée:</p>
//                     <div style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin-bottom: 20px;">
//                         <p style="font-size: 16px; color: #555;">
//                             <strong>Titre de la tâche:</strong> ${titre}
//                         </p>
//                         <p style="font-size: 16px; color: #555;">
//                             <strong>Description:</strong> ${description || text}
//                         </p>
//                     </div>
//                     <p style="font-size: 16px; color: #555; text-align: center;">Merci de prendre connaissance de cette tâche dès que possible.</p>
//                     <p style="font-size: 16px; color: #555; text-align: center;">
//                         Cordialement,<br>
//                         <span style="color: #4CAF50;">${nomsUtilisateurs}</span>
//                     </p>
//                 </div>
//             `;
//             await sendEmail(utilisateur.email, subject, message); 
//         }
//       }

//       await Notification.create({
//         equipe,
//         text,
//         tache: tache._id,
//       });

//       res.status(200).json({ status: true, tache, message: "Tache créée avec succès." });
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json({ status: false, message: error.message });
//     }
//   };


// export const dupliquerTache = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const {equipe}=req.body;
//         const tache = await Tache.findById(id);
//         const nouvelleTache = await Tache.create({
//             ...tache, titre: tache.titre + " - Dupliquée"
//         });
//         const { titre, date, tag } = tache;  
//         let nomsUtilisateurs = '';
//         const utilisateurs = await Utilisateur.find({ _id: { $in: equipe } });
//         nomsUtilisateurs = utilisateurs.map(u => u.nom).join(', ');


//         nouvelleTache.equipe = tache.equipe;
//         nouvelleTache.sousTaches = tache.sousTaches;
//         nouvelleTache.atouts = tache.atouts;
//         nouvelleTache.priorite = tache.priorite;
//         nouvelleTache.phase = tache.phase;

//         await nouvelleTache.save();

//         for(let memberId of tache.equipe){
//             const utilisateur= await Utilisateur.findById(memberId);
//             if(utilisateur && utilisateur.email){
//                 const subject=`La tache ${titre} a ete dupliquée`;
//                 const message=`
//                 <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
//                         <h2 style="color: #4CAF50; text-align: center;">Bonjour ${utilisateur.nom},</h2>
//                         <p style="font-size: 16px; color: #555; text-align: center;">La tâche:  ${titre} a été dupliquée</p>
//                         <div style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin-bottom: 20px;">
//                             <p style="font-size: 16px; color: #555;">
//                                 <strong>Titre de la tâche:</strong> ${titre}
//                             </p>
//                             <p style="font-size: 16px; color: #555;">
//                                 <strong>Tag:</strong> ${tag || "Aucun tag spécifié"}
//                             </p>
//                             <p style="font-size: 16px; color: #555;">
//                                 <strong>Date:</strong> ${new Date(date).toDateString()}
//                             </p>
//                         </div>
//                         <p style="font-size: 16px; color: #555; text-align: center;">
//                             Cordialement,<br>
//                             <span style="color: #4CAF50;">${nomsUtilisateurs}</span>
//                         </p>
//                     </div>
//                 `;
//                 await sendEmail(utilisateur.email,subject,message);
//             }
//         }
//         let text = "Une nouvelle tâche vous a été assignée.";
//         if (tache.equipe.length > 1) {
//             text = text + ` et ${tache.equipe.length - 1} autres`;
//         }
//         text = text + `La priorité de la tâche est définie comme étant ${tache.priorite}, veuillez vérifier et agir. La date de la tâche est ${tache.date.toDateString()}. Merci en avance !`
//         await Notification.create({
//             equipe: tache.equipe,
//             text,
//             tache: nouvelleTache._id
//         });
//         res.status(200).json({ status: true, message: "Tâche dupliquée avec succès" })

//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// };

// export const posteActiviteTache = async (req, res) => {
//     const { id } = req.params;
//     const { type, activite } = req.body;

//     try {
//         if (!type || typeof type !== 'string' || type.trim() === '') {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "Le champ 'type' est obligatoire et doit être une chaîne non vide" 
//             });
//         }

//         if (!activite || typeof activite !== 'string' || activite.trim() === '') {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "Le champ 'activite' est obligatoire et doit être une chaîne non vide" 
//             });
//         }

//         const tache = await Tache.findById(id);

//         if (!tache) {
//             return res.status(404).json({ message: "Tâche non trouvée" });
//         }

//         // Migration: Si activitees est un objet ou null/undefined, le convertir en tableau
//         if (!Array.isArray(tache.activitees)) {
//             // Si c'est un objet non-null, le mettre dans un tableau
//             if (tache.activitees && typeof tache.activitees === 'object') {
//                 tache.activitees = [tache.activitees];
//             } else {
//                 // Si c'est null/undefined ou autre chose, initialiser un tableau vide
//                 tache.activitees = [];
//             }

//             // Sauvegarder la migration
//             await tache.save();
//         }

//         const newActivity = {
//             type,
//             activite,
//             par: req.utilisateur?.userId || 'Unknown',
//             date: new Date(),
//         };

//         tache.activitees.push(newActivity);
//         await tache.save();

//         res.status(201).json({ success: true, newActivity });
//     } catch (error) {
//         console.error('Server error:', error);
//         res.status(500).json({ 
//             message: "Erreur serveur lors de l'ajout d'une activité", 
//             error: error.message 
//         });
//     }
// };

// // Script de migration pour corriger les documents existants
// export const migrerActivitees = async () => {
//     try {
//         const taches = await Tache.find({});

//         for (const tache of taches) {
//             if (!Array.isArray(tache.activitees)) {
//                 if (tache.activitees && typeof tache.activitees === 'object') {
//                     tache.activitees = [tache.activitees];
//                 } else {
//                     tache.activitees = [];
//                 }
//                 await tache.save();
//             }
//         }

//         console.log('Migration des activitees terminée avec succès');
//     } catch (error) {
//         console.error('Erreur lors de la migration:', error);
//     }
// };





// await migrerActivitees();

// export const statistiquesDashboard = async (req, res) => {
//     try {
//         const { userId, isAdmin } = req.utilisateur;
//         const toutesTaches = isAdmin ? await Tache.find({
//             isTrashed: false
//         }).populate({ path: "equipe", select: "nom role titre email" }).sort({ _id: -1 })
//             : await Tache.find({
//                 isTrashed: false,
//                 equipe: { $all: [userId] }
//             }).populate({ path: "equipe", select: "nom role titre email" }).sort({ _id: -1 })
//             ;

//         const utilisateurs = await Utilisateur.find({ isActive: true }).select("nom titre role isAdmin creeLe").limit(10).sort({ _id: -1 });


//         const groupeTaches = toutesTaches.reduce((resultat, tache) => {
//             const phase = tache.phase;
//             if (!resultat[phase]) {
//                 resultat[phase] = 1;
//             }
//             else {
//                 resultat[phase] += 1;
//             }
//             return resultat
//         }, {});


//         const groupDonnees = Object.entries(
//             toutesTaches.reduce((resultat, tache) => {
//                 const { priorite } = tache
//                 resultat[priorite] = (resultat[priorite] || 0) + 1;
//                 return resultat;
//             }, {})).map(([nom, total]) => ({ nom, total }));


//         const totalTaches = toutesTaches?.length;
//         const derniere10Tache = toutesTaches?.slice(0, 10);

//         const summary = {
//             totalTaches,
//             derniere10Tache,
//             utilisateurs: isAdmin ? utilisateurs : [],
//             taches: groupeTaches,
//             graphDonnees: groupDonnees
//         };

//         res.status(200).json({
//             status: true, message: "En succès", ...summary
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// };


// export const recupererTaches = async (req, res) => {
//     try {
//         const { phase, isTrashed } = req.query;
//         const { userId, isAdmin } = req.utilisateur;
//         let query = { isTrashed: isTrashed ? true : false }
//         if (phase) {
//             query.phase = phase;
//         }
//         if (!isAdmin) {
//             query.equipe = userId;
//         }
//         let taches = await Tache.find(query)
//             .populate({
//                 path: "equipe",
//                 select: "nom titre email"
//             })
//             .sort({ _id: -1 });

//         res.status(200).json({
//             status: true,
//             taches
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// };


// export const recupererTache = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const tache = await Tache.findById(id)
//             .populate({
//                 path: "equipe",
//                 select: "nom titre role email"
//             })
//             .populate({
//                 path: "activitees.par",
//                 select: "nom"
//             })
//             .sort({ _id: -1 });
//         res.status(200).json({
//             status: true,
//             tache
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// };


// export const modifierTache = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { titre, date, equipe, phase, priorite, atouts, description } = req.body;

//         const tache = await Tache.findById(id);
//         if (!tache) {
//             return res.status(404).json({ status: false, message: "Tâche non trouvée" });
//         }
//         const oldValues = {
//             titre: tache.titre,
//             date: tache.date,
//             description:tache.description,
//             priorite: tache.priorite,
//             atouts: tache.atouts,
//             phase: tache.phase,
//             equipe: tache.equipe
//         };
//         let nomsUtilisateurs = '';
//         const utilisateurs = await Utilisateur.find({ _id: { $in: equipe } });
//         nomsUtilisateurs = utilisateurs.map(u => u.nom).join(', ');
//         tache.titre = titre;
//         tache.date = date;
//         tache.description=description;
//         tache.priorite = priorite;
//         tache.atouts = atouts;
//         tache.phase = phase;
//         tache.equipe = equipe;

//         await tache.save();
//         for(let memberId of tache.equipe){
//             const utilisateur = await Utilisateur.findById(memberId);
//             if (utilisateur && utilisateur.email) {
//                 const subject = `Mise à jour de la tâche: ${oldValues.titre}`;
//                 const message = `
//                     <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
//                         <h2 style="color: #4CAF50; text-align: center;">Bonjour ${utilisateur.nom},</h2>
//                         <p style="font-size: 16px; color: #555; text-align: center;">La tâche suivante a été mise à jour :</p>
//                         <div style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin-bottom: 20px;">
//                             <h3>Ancienne Tâche:</h3>
//                             <p><strong>Titre:</strong> ${oldValues.titre}</p>
//                             <p><strong>Date:</strong> ${new Date(oldValues.date).toDateString()}</p>
//                             <p><strong>Description:</strong> ${oldValues.description}</p>
//                             <p><strong>Phase:</strong> ${oldValues.phase}</p>
//                             <p><strong>Priorité:</strong> ${oldValues.priorite}</p>
//                             <p><strong>Atouts:</strong> ${oldValues.atouts}</p>
//                         </div>
//                         <div style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin-bottom: 20px;">
//                             <h3>Nouvelle Tâche:</h3>
//                             <p><strong>Titre:</strong> ${titre}</p>
//                             <p><strong>Date:</strong> ${new Date(date).toDateString()}</p>
//                             <p><strong>Description:</strong> ${description}</p>
//                             <p><strong>Phase:</strong> ${phase}</p>
//                             <p><strong>Priorité:</strong> ${priorite}</p>
//                             <p><strong>Atouts:</strong> ${atouts}</p>
//                         </div>
//                         <p style="font-size: 16px; color: #555; text-align: center;">
//                             Cordialement,<br>
//                             <span style="color: #4CAF50;">L'équipe de gestion des tâches: ${nomsUtilisateurs}</span>
//                         </p>
//                     </div>
//                 `;

//                 await sendEmail(utilisateur.email, subject, message);
//             }
//         }

//         res.status(200).json({ status: true, message: "Tâche modifiée avec succès et notifications envoyées" });

//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// };




// export const tacheSupprimee = async (req, res) => {
//     try {
//         console.log("Données reçues :", req.body);
//         const { id } = req.params;
//         const tache = await Tache.findById(id);  
//         const {equipe}= req.body;


//         const { titre, date, tag } = tache;  // These values are directly available on the task
//         let nomsUtilisateurs = '';
//         const utilisateurs = await Utilisateur.find({ _id: { $in: equipe } });
//         nomsUtilisateurs = utilisateurs.map(u => u.nom).join(', ');

//         tache.isTrashed = true;
//         await tache.save();

//         for (let memberId of tache.equipe) {
//             const utilisateur = await Utilisateur.findById(memberId);
//             if (utilisateur && utilisateur.email) {
//                 const subject = `La tâche: ${titre} a été annulée`;

//                 // Directly define the HTML content (message)
//                 const message = `
//                     <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
//                         <h2 style="color: #4CAF50; text-align: center;">Bonjour ${utilisateur.nom},</h2>
//                         <p style="font-size: 16px; color: #555; text-align: center;">La tâche:  ${titre} a été annulée</p>
//                         <div style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin-bottom: 20px;">
//                             <p style="font-size: 16px; color: #555;">
//                                 <strong>Titre de la tâche:</strong> ${titre}
//                             </p>
//                             <p style="font-size: 16px; color: #555;">
//                                 <strong>Tag:</strong> ${tag || "Aucun tag spécifié"}
//                             </p>
//                             <p style="font-size: 16px; color: #555;">
//                                 <strong>Date:</strong> ${new Date(date).toDateString()}
//                             </p>
//                         </div>
//                         <p style="font-size: 16px; color: #555; text-align: center;">
//                             Cordialement,<br>
//                             <span style="color: #4CAF50;">L'équipe de gestion des tâches ${nomsUtilisateurs}</span>
//                         </p>
//                     </div>
//                 `;
//                 await sendEmail(utilisateur.email, subject, message);
//             }
//         }
//         res.status(200).json({ status: true, message: "Tâche supprimée avec succès" });

//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// };



// export const supprimerRestorer = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { actionType } = req.query;


//         if (actionType === "supprimer") {
//             await Tache.findByIdAndDelete(id);
//         } else if (actionType === "supprimerTous") {
//             await Tache.deleteMany({ isTrashed: true })
//         } else if (actionType === "restorer") {
//             const resp = await Tache.findById(id)
//             resp.isTrashed = false;
//             resp.save();
//         } else if (actionType === "restorerTous") {
//             await Tache.updateMany({ isTrashed: true }, { $set: { isTrashed: false } });
//         }
//         res.status(200).json({ status: true, message: true, message: `Opération effectuée avec succès` });
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// }


// export const creerSousTache = async (req, res) => {
//     try {
//         console.log("Données reçues :", req.body); 
//         const { titre, date, tag } = req.body;
//         let text = "Une nouvelle sous-tâche vous a été assignée";
//         console.log('Corps de la requête :', req.body);
//         console.log('Paramètres :', req.params);
//         const { id } = req.params;
//         const NouvellesSousTache = {
//             titre,
//             date,
//             tag
//         };
//         const tache = await Tache.findById(id);
//         tache.sousTaches.push(NouvellesSousTache);
//          // Get the team members (equipe) from the task
//         const equipe = tache.equipe; // This is where equipe is defined
//         await tache.save();
//         let nomsUtilisateurs = '';
//         const utilisateurs = await Utilisateur.find({ _id: { $in: equipe } });
//         nomsUtilisateurs = utilisateurs.map(u => u.nom).join(', ');

//     for (let memberId of tache.equipe) {
//         const utilisateur = await Utilisateur.findById(memberId);
//         if (utilisateur && utilisateur.email) {
//           const subject = `Nouvelle sous-tâche assignée: ${titre}`;

//           const message = `
//   <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
//     <h2 style="color: #4CAF50; text-align: center;">Bonjour ${utilisateur.nom},</h2>
//     <p style="font-size: 16px; color: #555; text-align: center;">Une nouvelle sous-tâche vous a été assignée:</p>
//     <div style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin-bottom: 20px;">
//       <p style="font-size: 16px; color: #555;">
//         <strong>Titre de la sous-tâche:</strong> ${titre}
//       </p>
//       <p style="font-size: 16px; color: #555;">
//         <strong>Tag:</strong> ${tag || "Aucun tag spécifié"}
//       </p>
//       <p style="font-size: 16px; color: #555;">
//         <strong>Date:</strong> ${new Date(date).toDateString()}
//       </p>
//     </div>
//     <p style="font-size: 16px; color: #555; text-align: center;">Merci de prendre connaissance de cette sous-tâche dès que possible.</p>
//     <p style="font-size: 16px; color: #555; text-align: center;">
//       Cordialement,<br>
//       <span style="color: #4CAF50;">L'équipe de gestion des tâches: ${nomsUtilisateurs}</span>
//     </p>
//   </div>
// `;
//           await sendEmail(utilisateur.email, subject, message);
//         }
//       }
//         res.status(200).json({ status: true, message: "Sous tâche ajoutée avec succès" })
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// }




// export const searchTaches = async (req, res) => {
//     const { query } = req.query;

//     if (!query || query.trim() === "") {
//       return res.status(400).json({ error: 'Query parameter is required' });
//     }

//     try {
//       const results = await Tache.find({
//         $or:[
//             { titre: { $regex: query, $options: 'i' } },
//             { description: { $regex: query, $options: 'i' } },
//         ]
//     });
//       res.status(200).json(results);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Server error' });
//     }

// };

// export const getTachesForUser = async (req, res) => {
//     try {
//       const { userId } = req.params;

//       // Add validation for userId
//       if (!userId) {
//         return res.status(400).json({ message: "User ID is required" });
//       }
//     //   const user= Utilisateur.findById(userId);

//       const tasks = await Tache.find({ 
//         equipe: userId,
//         isTrashed: false  // Only get non-trashed tasks
//       }).populate('equipe', 'nom'); // Populate user details if needed

//       return res.json(tasks);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//       return res.status(500).json({ message: "Failed to fetch tasks" });
//     }
//   };
import Tache from "../models/tache.js";
import Utilisateur from "../models/user.js";
import Notification from "../models/notification.js";
import { sendEmail } from '../utils/email.js'


export const creerTache = async (req, res) => {
    try {
        const { userId } = req.utilisateur;
        //   const { titre, equipe, phase, date, priorite, atouts, description } = req.body;
        const { titre, equipe, phase, date, priorite, atouts, description, client } = req.body; // Récupérez le champ client

        let text = "Une nouvelle tâche vous a été assignée";
        if (equipe?.length > 1) {
            text = text + `et ${equipe?.length - 1} autres`;
        }
        text =
            text +
            `La priorité de la tâche est définie comme étant de ${priorite}, veuillez vérifier et agir. La date de la tâche est ${new Date(date).toDateString()}. Merci en avance !`;

        let nomsUtilisateurs = '';

        const utilisateurs = await Utilisateur.find({ _id: { $in: equipe } });

        nomsUtilisateurs = utilisateurs.map(u => u.nom).join(', ');

        // const tache = await Tache.create({
        //     titre,
        //     equipe,
        //     phase: phase,
        //     date,
        //     priorite: priorite,
        //     atouts,
        //     description,
        // });
        const tache = await Tache.create({
            titre,
            equipe,
            phase,
            date,
            priorite,
            atouts,
            description,
            client, // Ajoutez le champ client ici
          });

        for (let memberId of equipe) {
            const utilisateur = await Utilisateur.findById(memberId);
            if (utilisateur && utilisateur.email) {
                const subject = `Nouvelle tâche assignée: ${titre}`;

                const message = `
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
                    <h2 style="color: #4CAF50; text-align: center;">Bonjour ${utilisateur.nom},</h2>
                    <p style="font-size: 16px; color: #555; text-align: center;">Une nouvelle tâche vous a été assignée:</p>
                    <div style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin-bottom: 20px;">
                        <p style="font-size: 16px; color: #555;">
                            <strong>Titre de la tâche:</strong> ${titre}
                        </p>
                        <p style="font-size: 16px; color: #555;">
                            <strong>Description:</strong> ${description || text}
                        </p>
                    </div>
                    <p style="font-size: 16px; color: #555; text-align: center;">Merci de prendre connaissance de cette tâche dès que possible.</p>
                    <p style="font-size: 16px; color: #555; text-align: center;">
                        Cordialement,<br>
                        <span style="color: #4CAF50;">${nomsUtilisateurs}</span>
                    </p>
                </div>
            `;
                await sendEmail(utilisateur.email, subject, message);
            }
        }

        await Notification.create({
            equipe,
            text,
            tache: tache._id,
        });

        res.status(200).json({ status: true, tache, message: "Tache créée avec succès." });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};


export const dupliquerTache = async (req, res) => {
    try {
        const { id } = req.params;
        const { equipe } = req.body;
        const tache = await Tache.findById(id);
        const nouvelleTache = await Tache.create({
            ...tache, titre: tache.titre + " - Dupliquée"
        });
        const { titre, date, tag } = tache;
        let nomsUtilisateurs = '';
        const utilisateurs = await Utilisateur.find({ _id: { $in: equipe } });
        nomsUtilisateurs = utilisateurs.map(u => u.nom).join(', ');


        nouvelleTache.equipe = tache.equipe;
        nouvelleTache.sousTaches = tache.sousTaches;
        nouvelleTache.atouts = tache.atouts;
        nouvelleTache.priorite = tache.priorite;
        nouvelleTache.phase = tache.phase;

        await nouvelleTache.save();

        for (let memberId of tache.equipe) {
            const utilisateur = await Utilisateur.findById(memberId);
            if (utilisateur && utilisateur.email) {
                const subject = `La tache ${titre} a ete dupliquée`;
                const message = `
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
                        <h2 style="color: #4CAF50; text-align: center;">Bonjour ${utilisateur.nom},</h2>
                        <p style="font-size: 16px; color: #555; text-align: center;">La tâche:  ${titre} a été dupliquée</p>
                        <div style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin-bottom: 20px;">
                            <p style="font-size: 16px; color: #555;">
                                <strong>Titre de la tâche:</strong> ${titre}
                            </p>
                            <p style="font-size: 16px; color: #555;">
                                <strong>Tag:</strong> ${tag || "Aucun tag spécifié"}
                            </p>
                            <p style="font-size: 16px; color: #555;">
                                <strong>Date:</strong> ${new Date(date).toDateString()}
                            </p>
                        </div>
                        <p style="font-size: 16px; color: #555; text-align: center;">
                            Cordialement,<br>
                            <span style="color: #4CAF50;">${nomsUtilisateurs}</span>
                        </p>
                    </div>
                `;
                await sendEmail(utilisateur.email, subject, message);
            }
        }
        let text = "Une nouvelle tâche vous a été assignée.";
        if (tache.equipe.length > 1) {
            text = text + ` et ${tache.equipe.length - 1} autres`;
        }
        text = text + `La priorité de la tâche est définie comme étant ${tache.priorite}, veuillez vérifier et agir. La date de la tâche est ${tache.date.toDateString()}. Merci en avance !`
        await Notification.create({
            equipe: tache.equipe,
            text,
            tache: nouvelleTache._id
        });
        res.status(200).json({ status: true, message: "Tâche dupliquée avec succès" })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};


export const posteActiviteTache = async (req, res) => {
    const { id } = req.params;
    const { type, activite, atouts } = req.body;

    console.log('Received data:', { type, activite, atouts });

    try {
        if (!type || typeof type !== 'string' || type.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "Le champ 'type' est obligatoire et doit être une chaîne non vide"
            });
        }

        if (!activite || typeof activite !== 'string' || activite.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "Le champ 'activite' est obligatoire et doit être une chaîne non vide"
            });
        }

        const tache = await Tache.findById(id);

        if (!tache) {
            return res.status(404).json({ message: "Tâche non trouvée" });
        }

        // S'assurer que les atouts sont bien un tableau
        const filesArray = Array.isArray(atouts) ? atouts : [];

        const newActivity = {
            type,
            activite,
            atouts: filesArray, // Utilisation du tableau vérifié
            par: req.utilisateur?.userId || 'Unknown',
            date: new Date(),
        };

        console.log('New activity to be saved:', newActivity); // Debug log

        if (!Array.isArray(tache.activitees)) {
            tache.activitees = [];
        }

        tache.activitees.push(newActivity);
        await tache.save();

        res.status(201).json({ success: true, newActivity });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            message: "Erreur serveur lors de l'ajout d'une activité",
            error: error.message
        });
    }
};


export const migrerActivitees = async () => {
    try {
        const taches = await Tache.find({});
        
        for (const tache of taches) {
            if (!Array.isArray(tache.activitees)) {
                if (tache.activitees && typeof tache.activitees === 'object') {
                    tache.activitees = [tache.activitees];
                } else {
                    tache.activitees = [];
                }
                await tache.save();
            }
        }
        
        console.log('Migration des activitees terminée avec succès');
    } catch (error) {
        console.error('Erreur lors de la migration:', error);
    }
};





await migrerActivitees();

export const statistiquesDashboard = async (req, res) => {
    try {
        const { userId, isAdmin } = req.utilisateur;
        const toutesTaches = isAdmin ? await Tache.find({
            isTrashed: false
        }).populate({ path: "equipe", select: "nom role titre email" }).sort({ _id: -1 })
            : await Tache.find({
                isTrashed: false,
                equipe: { $all: [userId] }
            }).populate({ path: "equipe", select: "nom role titre email" }).sort({ _id: -1 })
            ;

        const utilisateurs = await Utilisateur.find({ isActive: true }).select("nom titre role isAdmin creeLe").limit(10).sort({ _id: -1 });


        const groupeTaches = toutesTaches.reduce((resultat, tache) => {
            const phase = tache.phase;
            if (!resultat[phase]) {
                resultat[phase] = 1;
            }
            else {
                resultat[phase] += 1;
            }
            return resultat
        }, {});


        const groupDonnees = Object.entries(
            toutesTaches.reduce((resultat, tache) => {
                const { priorite } = tache
                resultat[priorite] = (resultat[priorite] || 0) + 1;
                return resultat;
            }, {})).map(([nom, total]) => ({ nom, total }));


        const totalTaches = toutesTaches?.length;
        const derniere10Tache = toutesTaches?.slice(0, 10);

        const summary = {
            totalTaches,
            derniere10Tache,
            utilisateurs: isAdmin ? utilisateurs : [],
            taches: groupeTaches,
            graphDonnees: groupDonnees
        };

        res.status(200).json({
            status: true, message: "En succès", ...summary
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};


export const recupererTaches = async (req, res) => {
    try {
        const { phase, isTrashed } = req.query;
        const { userId, isAdmin } = req.utilisateur;
        let query = { isTrashed: isTrashed ? true : false }
        if (phase) {
            query.phase = phase;
        }
        if (!isAdmin) {
            query.equipe = userId;
        }
        let taches = await Tache.find(query)
            .populate({
                path: "equipe",
                select: "nom titre email"
            })
            .sort({ _id: -1 });

        res.status(200).json({
            status: true,
            taches
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};


export const recupererTache = async (req, res) => {
    try {
        const { id } = req.params;
        const tache = await Tache.findById(id)
            .populate({
                path: "equipe",
                select: "nom titre role email"
            })
            .populate({
                path: "activitees.par",
                select: "nom"
            })
            .sort({ _id: -1 });
        res.status(200).json({
            status: true,
            tache
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};


export const modifierTache = async (req, res) => {
    try {
        const { id } = req.params;
        const { titre, date, equipe, phase, priorite, atouts, description } = req.body;

        const tache = await Tache.findById(id);
        if (!tache) {
            return res.status(404).json({ status: false, message: "Tâche non trouvée" });
        }
        const oldValues = {
            titre: tache.titre,
            date: tache.date,
            description: tache.description,
            priorite: tache.priorite,
            atouts: tache.atouts,
            phase: tache.phase,
            equipe: tache.equipe
        };
        let nomsUtilisateurs = '';
        const utilisateurs = await Utilisateur.find({ _id: { $in: equipe } });
        nomsUtilisateurs = utilisateurs.map(u => u.nom).join(', ');
        tache.titre = titre;
        tache.date = date;
        tache.description = description;
        tache.priorite = priorite;
        tache.atouts = atouts;
        tache.phase = phase;
        tache.equipe = equipe;

        await tache.save();
        for (let memberId of tache.equipe) {
            const utilisateur = await Utilisateur.findById(memberId);
            if (utilisateur && utilisateur.email) {
                const subject = `Mise à jour de la tâche: ${oldValues.titre}`;
                const message = `
                    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
                        <h2 style="color: #4CAF50; text-align: center;">Bonjour ${utilisateur.nom},</h2>
                        <p style="font-size: 16px; color: #555; text-align: center;">La tâche suivante a été mise à jour :</p>
                        <div style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin-bottom: 20px;">
                            <h3>Ancienne Tâche:</h3>
                            <p><strong>Titre:</strong> ${oldValues.titre}</p>
                            <p><strong>Date:</strong> ${new Date(oldValues.date).toDateString()}</p>
                            <p><strong>Description:</strong> ${oldValues.description}</p>
                            <p><strong>Phase:</strong> ${oldValues.phase}</p>
                            <p><strong>Priorité:</strong> ${oldValues.priorite}</p>
                            <p><strong>Atouts:</strong> ${oldValues.atouts}</p>
                        </div>
                        <div style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin-bottom: 20px;">
                            <h3>Nouvelle Tâche:</h3>
                            <p><strong>Titre:</strong> ${titre}</p>
                            <p><strong>Date:</strong> ${new Date(date).toDateString()}</p>
                            <p><strong>Description:</strong> ${description}</p>
                            <p><strong>Phase:</strong> ${phase}</p>
                            <p><strong>Priorité:</strong> ${priorite}</p>
                            <p><strong>Atouts:</strong> ${atouts}</p>
                        </div>
                        <p style="font-size: 16px; color: #555; text-align: center;">
                            Cordialement,<br>
                            <span style="color: #4CAF50;">L'équipe de gestion des tâches: ${nomsUtilisateurs}</span>
                        </p>
                    </div>
                `;

                await sendEmail(utilisateur.email, subject, message);
            }
        }

        res.status(200).json({ status: true, message: "Tâche modifiée avec succès et notifications envoyées" });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};




export const tacheSupprimee = async (req, res) => {
    try {
        console.log("Données reçues :", req.body);
        const { id } = req.params;
        const tache = await Tache.findById(id);
        const { equipe } = req.body;


        const { titre, date, tag } = tache;  // These values are directly available on the task
        let nomsUtilisateurs = '';
        const utilisateurs = await Utilisateur.find({ _id: { $in: equipe } });
        nomsUtilisateurs = utilisateurs.map(u => u.nom).join(', ');

        tache.isTrashed = true;
        await tache.save();

        for (let memberId of tache.equipe) {
            const utilisateur = await Utilisateur.findById(memberId);
            if (utilisateur && utilisateur.email) {
                const subject = `La tâche: ${titre} a été annulée`;

                // Directly define the HTML content (message)
                const message = `
                    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
                        <h2 style="color: #4CAF50; text-align: center;">Bonjour ${utilisateur.nom},</h2>
                        <p style="font-size: 16px; color: #555; text-align: center;">La tâche:  ${titre} a été annulée</p>
                        <div style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin-bottom: 20px;">
                            <p style="font-size: 16px; color: #555;">
                                <strong>Titre de la tâche:</strong> ${titre}
                            </p>
                            <p style="font-size: 16px; color: #555;">
                                <strong>Tag:</strong> ${tag || "Aucun tag spécifié"}
                            </p>
                            <p style="font-size: 16px; color: #555;">
                                <strong>Date:</strong> ${new Date(date).toDateString()}
                            </p>
                        </div>
                        <p style="font-size: 16px; color: #555; text-align: center;">
                            Cordialement,<br>
                            <span style="color: #4CAF50;">L'équipe de gestion des tâches ${nomsUtilisateurs}</span>
                        </p>
                    </div>
                `;
                await sendEmail(utilisateur.email, subject, message);
            }
        }
        res.status(200).json({ status: true, message: "Tâche supprimée avec succès" });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};



export const supprimerRestorer = async (req, res) => {
    try {
        const { id } = req.params;
        const { actionType } = req.query;


        if (actionType === "supprimer") {
            await Tache.findByIdAndDelete(id);
        } else if (actionType === "supprimerTous") {
            await Tache.deleteMany({ isTrashed: true })
        } else if (actionType === "restorer") {
            const resp = await Tache.findById(id)
            resp.isTrashed = false;
            resp.save();
        } else if (actionType === "restorerTous") {
            await Tache.updateMany({ isTrashed: true }, { $set: { isTrashed: false } });
        }
        res.status(200).json({ status: true, message: true, message: `Opération effectuée avec succès` });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}


export const creerSousTache = async (req, res) => {
    try {
        console.log("Données reçues :", req.body);
        const { titre, date, tag } = req.body;
        let text = "Une nouvelle sous-tâche vous a été assignée";
        console.log('Corps de la requête :', req.body);
        console.log('Paramètres :', req.params);
        const { id } = req.params;
        const NouvellesSousTache = {
            titre,
            date,
            tag
        };
        const tache = await Tache.findById(id);
        tache.sousTaches.push(NouvellesSousTache);
        // Get the team members (equipe) from the task
        const equipe = tache.equipe; // This is where equipe is defined
        await tache.save();
        let nomsUtilisateurs = '';
        const utilisateurs = await Utilisateur.find({ _id: { $in: equipe } });
        nomsUtilisateurs = utilisateurs.map(u => u.nom).join(', ');

        for (let memberId of tache.equipe) {
            const utilisateur = await Utilisateur.findById(memberId);
            if (utilisateur && utilisateur.email) {
                const subject = `Nouvelle sous-tâche assignée: ${titre}`;

                const message = `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
    <h2 style="color: #4CAF50; text-align: center;">Bonjour ${utilisateur.nom},</h2>
    <p style="font-size: 16px; color: #555; text-align: center;">Une nouvelle sous-tâche vous a été assignée:</p>
    <div style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin-bottom: 20px;">
      <p style="font-size: 16px; color: #555;">
        <strong>Titre de la sous-tâche:</strong> ${titre}
      </p>
      <p style="font-size: 16px; color: #555;">
        <strong>Tag:</strong> ${tag || "Aucun tag spécifié"}
      </p>
      <p style="font-size: 16px; color: #555;">
        <strong>Date:</strong> ${new Date(date).toDateString()}
      </p>
    </div>
    <p style="font-size: 16px; color: #555; text-align: center;">Merci de prendre connaissance de cette sous-tâche dès que possible.</p>
    <p style="font-size: 16px; color: #555; text-align: center;">
      Cordialement,<br>
      <span style="color: #4CAF50;">L'équipe de gestion des tâches: ${nomsUtilisateurs}</span>
    </p>
  </div>
`;
                await sendEmail(utilisateur.email, subject, message);
            }
        }
        res.status(200).json({ status: true, message: "Sous tâche ajoutée avec succès" })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}




export const searchTaches = async (req, res) => {
    const { query } = req.query;

    if (!query || query.trim() === "") {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const results = await Tache.find({
            $or: [
                { titre: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ]
        });
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }

};

export const getTachesForUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Add validation for userId
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        //   const user= Utilisateur.findById(userId);

        const tasks = await Tache.find({
            equipe: userId,
            isTrashed: false  // Only get non-trashed tasks
        }).populate('equipe', 'nom'); // Populate user details if needed

        return res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: "Failed to fetch tasks" });
    }
};



// export const createBulkTasks = async (req, res) => {
//     try {
//       const { tasks } = req.body;
      
//       const createdTasks = await Tache.insertMany(tasks.map(task => ({
//         ...task,
//         par: req.utilisateur?.userId
//       })));
  
//       res.status(201).json({
//         success: true,
//         tasks: createdTasks
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Erreur lors de la création des tâches",
//         error: error.message
//       });
//     }
//   };



    
    // exports.importTasks = async (req, res) => {
        

    // const csv = require('csv-parser'); // For CSV parsing
    // const XLSX = require('xlsx'); // For XLSX parsing
    // const { Tache } = require('../models/tache'); // Assuming you have a Tache model
    
    // const validateTask = (task) => {
    //   const requiredFields = ['titre', 'date', 'phase'];
    //   const isValid = requiredFields.every(
    //     (field) => task[field] && task[field].trim() !== ''
    //   );
    
    //   if (!isValid) return false;
    
    //   const validPhases = ['À faire', 'En cours', 'Terminée'];
    //   return validPhases.includes(task.phase);
    // };
    //   try {
    //     const file = req.file;
    //     if (!file) return res.status(400).json({ message: 'No file uploaded.' });
    
    //     const ext = file.originalname.split('.').pop().toLowerCase();
    //     let tasks = [];
    
    //     if (ext === 'csv') {
    //       // Parse CSV file
    //       const stream = require('stream');
    //       const csvData = [];
    //       const pipeline = stream.Readable.from(file.buffer);
    //       pipeline
    //         .pipe(csv())
    //         .on('data', (row) => csvData.push(row))
    //         .on('end', () => {
    //           tasks = csvData;
    //         });
    //     } else if (ext === 'xlsx') {
    //       // Parse XLSX file
    //       const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    //       const sheetName = workbook.SheetNames[0];
    //       const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    //       tasks = sheet;
    //     } else {
    //       return res
    //         .status(400)
    //         .json({ message: 'Invalid file format. Use CSV or XLSX.' });
    //     }
    
    //     // Validate tasks
    //     const validTasks = tasks.filter(validateTask);
    //     if (validTasks.length === 0) {
    //       return res.status(400).json({
    //         message: 'No valid tasks found in the file.',
    //       });
    //     }
    
    //     // Store valid tasks in the database
    //     await Tache.insertMany(validTasks);
    //     return res.status(200).json({
    //       message: `${validTasks.length} tasks imported successfully.`,
    //     });
    //   } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({
    //       message: 'Error importing tasks.',
    //     });
    //   }
    // };
    
