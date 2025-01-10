import mongoose, { Schema } from "mongoose";

const noticeSchema = new Schema(
    {
        equipe: [{ type: Schema.Types.ObjectId, ref: "Utilisateur" }],
        text: { type: String },
        tache: { type: Schema.Types.ObjectId, ref: "Tache" },
        notifType: {type:String, default:"alerte",enum:["alerte","message"] },
        notifLu: [{type: Schema.Types.ObjectId, ref:"Utilisateur"}]
    },
    {timestamps:true}
);

const Notification = mongoose.model("Notification",noticeSchema);

export default Notification;