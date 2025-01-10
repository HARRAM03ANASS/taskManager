import jwt from 'jsonwebtoken';
import Utilisateur from "../models/user.js";

const protectRoute = async(req,res,next) => {
    try{
        let token = req.cookies?.token;
        if(token) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const resp = await Utilisateur.findById(decodedToken.userId).select("isAdmin email");
            req.utilisateur = {
                email: resp.email,
                isAdmin : resp.isAdmin,
                userId: decodedToken.userId
            };
                console.log('Authenticated user:', req.utilisateur);  // Add this logging

            next();
        } else{
            return res.redirect('/log-in');
        }
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            res.clearCookie("token");  // Clear expired token
            console.log("Token expired. Redirecting to login.");
            return res.redirect('/log-in');
        }
        
        console.log(error);
        return res.redirect('/log-in');  // Redirect for other errors
    }
};

const isAdminRoute = (req,res,next) => {
    if(req.utilisateur && req.utilisateur.isAdmin){
        next();
    }
    else {
        return res.status(401).json({
            status: false,
            message: "Non autorisé comme admin. Essayez une autre fois."
        });
    }
};

export {isAdminRoute, protectRoute};