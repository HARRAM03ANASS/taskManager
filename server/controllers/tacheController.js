// import Tache from "../models/tache.js";
// import Utilisateur from "../models/user.js";
// import Notification from "../models/notification.js";
// import { sendEmail } from '../utils/email.js' // Adjust the path according to your folder structure

// export const creerTache = async (req, res) => {
//     try {
//       const { userId } = req.utilisateur;
//       const { titre, equipe, phase, date, priorite, atouts } = req.body;
//       let text = "Une nouvelle tâche vous a été assignée";
//       if (equipe?.length > 1) {
//         text = text + `et ${equipe?.length - 1} autres`;
//       }
//       text =
//         text +
//         `La priorité de la tâche est définie comme étant de ${priorite}, veuillez vérifier et agir. La date de la tâche est ${new Date(date).toDateString()}. Merci en avance !`;
  
//       const tache = await Tache.create({
//         titre,
//         equipe,
//         phase: phase,
//         date,
//         priorite: priorite,
//         atouts,
//       });
  
//       // Send emails to all team members
//       for (let memberId of equipe) {
//         const utilisateur = await Utilisateur.findById(memberId);
//         console.log(utilisateur.email)
//         if (utilisateur && utilisateur.email) {
//           const subject = `Nouvelle tâche assignée: ${titre}`;
//           const message = `Bonjour ${utilisateur.nom},\n\n${text}`;
//             await sendEmail(utilisateur.email, subject, message); // Send email
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
//         const tache = await Tache.findById(id);
//         const nouvelleTache = await Tache.create({
//             ...tache, titre: tache.titre + " - Dupliquée"
//         });
//         nouvelleTache.equipe = tache.equipe;
//         nouvelleTache.sousTaches = tache.sousTaches;
//         nouvelleTache.atouts = tache.atouts;
//         nouvelleTache.priorite = tache.priorite;
//         nouvelleTache.phase = tache.phase;

//         await nouvelleTache.save();

//         // notifier les utilisateurs sur la tâche
//         let text = "Une nouvelle tâche vous a été assignée.";
//         if (tache.equipe.length > 1) {
//             // text = text + ` et ${tache.equipe.length - 1} autres`;
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
//     try {
//         const { id } = req.params;
//         const { userId } = req.utilisateur;
//         // const {userId} = req.user;
//         const { type, activite } = req.body;
//         const tache = await Tache.findById(id);
//         const donnees = {
//             type,
//             activite,
//             par: userId
//         };
//         tache.activites.push(donnees)
//         await tache.save();

//         res.status(200).json({ status: true, message: "Activité postée avec succès" });

//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// };


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

//         // Grouper les tâches par priorité
//         const groupDonnees = Object.entries(
//             toutesTaches.reduce((resultat, tache) => {
//                 const { priorite } = tache
//                 resultat[priorite] = (resultat[priorite] || 0) + 1;
//                 return resultat;
//             }, {})).map(([nom, total]) => ({ nom, total }));

//         // Calculer le total des tâches
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
//         let query = { isTrashed: isTrashed ? true : false };
//         if (phase) {
//             query.phase = phase;
//         }
//         let queryResultat = Tache.find(query).populate({
//             path: "equipe",
//             select: "nom titre email"
//         }).sort({ _id: -1 });
//         const taches = await queryResultat;
//         res.status(200).json({
//             status: true,
//             taches
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// };


// export const recupererTache = async (req, res) => {
//     try {
//         // const { id } = res.params;
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
//         const { titre, date, equipe, phase, priorite, atouts } = req.body;
//         const tache = await Tache.findById(id);

//         tache.titre = titre;
//         tache.date = date;
//         tache.priorite = priorite;
//         tache.atouts = atouts;
//         tache.phase = phase;
//         tache.equipe = equipe;

//         await tache.save();

//         res.status(200).json({ status: true, message: "Tâche modifiée avec succès" });

//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// }


// export const tacheSupprimee = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const tache = await Tache.findById(id);
//         tache.isTrashed = true;
//         await tache.save();
//         res.status(200).json({
//             status: true,
//             message: "Tâche supprimée avec succès"
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// }


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
//         console.log("Données reçues :", req.body); // Ajoutez ce log
//         const { titre, date, tag } = req.body;

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
//         await tache.save();
//         res.status(200).json({ status: true, message: "Sous tâche ajoutée avec succès" })
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// }

import Tache from "../models/tache.js";
import Utilisateur from "../models/user.js";
import Notification from "../models/notification.js";
import { sendEmail } from '../utils/email.js' 

export const creerTache = async (req, res) => {
    try {
      const { userId } = req.utilisateur;
      const { titre, equipe, phase, date, priorite, atouts, description } = req.body;
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
      
        const tache = await Tache.create({
        titre,
        equipe,
        phase: phase,
        date,
        priorite: priorite,
        atouts,
        description,
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
        const {equipe}=req.body;
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

        for(let memberId of tache.equipe){
            const utilisateur= await Utilisateur.findById(memberId);
            if(utilisateur && utilisateur.email){
                const subject=`La tache ${titre} a ete dupliquée`;
                const message=`
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
                await sendEmail(utilisateur.email,subject,message);
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
    try {
        const { id } = req.params;
        const { userId } = req.utilisateur;
        // const {userId} = req.user;
        const { type, activite } = req.body;
        const tache = await Tache.findById(id);
        const donnees = {
            type,
            activite,
            par: userId
        };
        tache.activites.push(donnees)
        await tache.save();

        res.status(200).json({ status: true, message: "Activité postée avec succès" });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};


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
        let query = { isTrashed: isTrashed ? true : false };
        if (phase) {
            query.phase = phase;
        }
        let queryResultat = Tache.find(query).populate({
            path: "equipe",
            select: "nom titre email"
        }).sort({ _id: -1 });
        const taches = await queryResultat;
        res.status(200).json({
            status: true,
            taches
        })
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
        const { titre, date, equipe, phase, priorite, atouts } = req.body;
        const tache = await Tache.findById(id);

        tache.titre = titre;
        tache.date = date;
        tache.priorite = priorite;
        tache.atouts = atouts;
        tache.phase = phase;
        tache.equipe = equipe;

        await tache.save();

        res.status(200).json({ status: true, message: "Tâche modifiée avec succès" });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}



export const tacheSupprimee = async (req, res) => {
    try {
        console.log("Données reçues :", req.body);
        const { id } = req.params;
        const tache = await Tache.findById(id);  
        const {equipe}= req.body;


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
        $or:[
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