import jwt from "jsonwebtoken";
import { Utilisateur } from "../models/relation.js";

// 1. Authentification : vérifier la validité du token JWT (Chapitre 7)
export const verifierToken = (req, res, next) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
        return res.status(401).json({ message: "Pas authentifié" });
    }

    const token = bearerToken.split(" ")[1];

    jwt.verify(token, process.env.CODE_SECRET, (error, valeurDecode) => {
        if (error) {
            return res.status(401).json({ message: error.message });
        }
        req.userId = valeurDecode.id;
        next();
    });
};

// 2. Autorisation : vérifier le rôle de l'utilisateur connecté (Chapitre 7)
export const autorise = (roles) => async (req, res, next) => {
    const id = req.userId;

    if (!id) {
        return res.status(401).json({ message: "Accès refusé, utilisateur non authentifié" });
    }

    try {
        const utilisateur = await Utilisateur.findByPk(id);
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        const userRole = await utilisateur.getRole();

        if (!userRole || !roles.includes(userRole.nom)) {
            return res.status(403).json({ message: "Accès refusé, rôle insuffisant" });
        }

        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}