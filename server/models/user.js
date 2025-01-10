import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    nom: { type: String, required: true },
    titre: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motdepasse: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    taches: [{ type: Schema.Types.ObjectId, ref: "Tache" }],
    isActive: { type: Boolean, required: true, default: true }
}, { timestamps: true });


userSchema.pre("save", async function (next) {
    if (!this.isModified("motdepasse")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.motdepasse = await bcrypt.hash(this.motdepasse, salt);
});

userSchema.methods.matchPassword = async function (enteredMotDePasse) {
    return await bcrypt.compare(enteredMotDePasse, this.motdepasse);
};

const Utilisateur = mongoose.model("Utilisateur", userSchema);

export default Utilisateur;