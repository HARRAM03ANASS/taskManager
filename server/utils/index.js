import mongoose from "mongoose";

import jwt from "jsonwebtoken";

const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb+srv://anass:Admin2024@cluster0.jci04.mongodb.net/gestion_des_taches?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connexion à la base de données établie")
    }
    catch (error) {
        console.log("DB error" + error);
    }
};

export default dbConnection;
export const createJWT = (res, userId) => {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
    });
};