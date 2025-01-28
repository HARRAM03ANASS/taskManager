import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    timestamps: { 
        createdAt: 'creeLe', 
        updatedAt: 'modifieLe' 
    }
});

const Client = mongoose.model('Client', clientSchema);
export default Client;