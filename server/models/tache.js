// import mongoose, { Schema } from "mongoose";


// const tacheSchema = new Schema({
//     titre: { type: String, required: true },
//     description: { type: String, default:"No description provided" },
//     date: { type: Date, default: new Date() },
//     priorite: {
//         type: String,
//         default: "Normale",
//         enum: ["Elevée", "Moyenne", "Normale", "Faible"]
//     },
//     phase: {
//         type: String,
//         default: "À faire",
//         enum: ["À faire", "En cours", "Terminée"]
//     },
//     activitees: [{
//         type: {
//             type: String,
//             required: true,
//             enum: [
//                 "Affectée",
//                 "Commencée",
//                 "En cours",
//                 "Bug",
//                 "Terminée",
//                 "Commentée"
//             ]
//         },
//         activite: { 
//             type: String,
//             required: true
//         },
//         date: { 
//             type: Date, 
//             default: Date.now 
//         },
//         par: { 
//             type: Schema.Types.ObjectId, 
//             ref: "Utilisateur",
//             required: true
//         },
//         atouts: [{  
//             id: String,
//             url: String
//         }]
//     }],
//     sousTaches: [
//         {
//             titre: { type: String, required: true },
//             date: { type: Date, required: true },
//             tag: { type: String, required: true },
//         },
//     ],
//     atouts: [{
//         id: String,
//         url: String
//     }],
//     equipe: [{ type: Schema.Types.ObjectId, ref: "Utilisateur" }],
//     isTrashed: { type: Boolean, default: false }
// }, { timestamps: true });


// const Tache = mongoose.model('Tache', tacheSchema);
// export default Tache;

// import mongoose, { Schema } from "mongoose";


// const tacheSchema = new Schema({
//     titre: { type: String, required: true },
//     description: { type: String, default:"No description provided" },
//     date: { type: Date, default: new Date() },
//     priorite: {
//         type: String,
//         default: "Normale",
//         enum: ["Elevée", "Moyenne", "Normale", "Faible"]
//     },
//     phase: {
//         type: String,
//         default: "À faire",
//         enum: ["À faire", "En cours", "Terminée"]
//     },
//     activitees: [{
//         type: {
//             type: String,
//             required: true,
//             enum: [
//                 "Affectée",
//                 "Commencée",
//                 "En cours",
//                 "Bug",
//                 "Terminée",
//                 "Commentée"
//             ]
//         },
//         activite: { 
//             type: String,
//             required: true
//         },
//         date: { 
//             type: Date, 
//             default: Date.now 
//         },
//         par: { 
//             type: Schema.Types.ObjectId, 
//             ref: "Utilisateur",
//             required: true
//         },
//         atouts: [{  
//             id: String,
//             url: String
//         }]
//     }],
//     sousTaches: [
//         {
//             titre: { type: String, required: true },
//             date: { type: Date, required: true },
//             tag: { type: String, required: true },
//         },
//     ],
//     atouts: [{
//         id: String,
//         url: String
//     }],
//     equipe: [{ type: Schema.Types.ObjectId, ref: "Utilisateur" }],
//     isTrashed: { type: Boolean, default: false }
// }, { timestamps: true });


// const Tache = mongoose.model('Tache', tacheSchema);
// export default Tache;

import mongoose, { Schema } from "mongoose";


const tacheSchema = new Schema({
    titre: { type: String, required: true },
    description: { type: String, default:"No description provided" },
    date: { type: Date, default: new Date() },
    priorite: {
        type: String,
        default: "Normale",
        enum: ["Elevée", "Moyenne", "Normale", "Faible"]
    },
    phase: {
        type: String,
        default: "À faire",
        enum: ["À faire", "En cours", "Terminée"]
    },
    activitees: [{
        type: {
            type: String,
            required: true,
            enum: [
                "Affectée",
                "Commencée",
                "En cours",
                "Bug",
                "Terminée",
                "Commentée"
            ]
        },
        activite: { 
            type: String,
            required: true
        },
        date: { 
            type: Date, 
            default: Date.now 
        },
        par: { 
            type: Schema.Types.ObjectId, 
            ref: "Utilisateur",
            required: true
        },
        atouts: [{  
            id: String,
            url: String
        }]
    }],
    sousTaches: [
        {
            titre: { type: String, required: true },
            date: { type: Date, required: true },
            tag: { type: String, required: true },
        },
    ],
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },

    atouts: [{
        id: String,
        url: String
    }],
    equipe: [{ type: Schema.Types.ObjectId, ref: "Utilisateur" }],
    isTrashed: { type: Boolean, default: false }
}, { timestamps: true });


const Tache = mongoose.model('Tache', tacheSchema);
export default Tache;