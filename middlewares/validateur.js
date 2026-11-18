import { body, validationResult } from "express-validator";

// Middleware qui vérifie s'il y a des erreurs de validation
export const validerResultat = (req, res, next) => {
    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) {
        return res.status(400).json({ erreurs: erreurs.array() });
    }
    next();
};

// 1. Validation pour Roles
export const validerRole = [
    body("nom").trim().notEmpty().withMessage("Le nom du rôle est obligatoire"),
    validerResultat
];

// 2. Validation pour Utilisateurs (Inscription & Mise à jour)
export const validerUtilisateur = [
    body("nom").trim().notEmpty().withMessage("Le nom est obligatoire"),
    body("email").trim().isEmail().withMessage("Format d'email invalide"),
    body("mot_de_passe")
        .optional()
        .isLength({ min: 6 })
        .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
    body("role_id").isInt({ min: 1 }).withMessage("L'identifiant du rôle (role_id) doit être un entier valide"),
    validerResultat
];

// 3. Validation pour Login
export const validerLogin = [
    body("email").trim().isEmail().withMessage("Email invalide"),
    body("mot_de_passe").notEmpty().withMessage("Le mot de passe est requis"),
    validerResultat
];

// 4. Validation pour Magasins
export const validerMagasin = [
    body("nom").trim().notEmpty().withMessage("Le nom du magasin est obligatoire"),
    body("adresse").trim().notEmpty().withMessage("L'adresse du magasin est obligatoire"),
    validerResultat
];

// 5. Validation pour Murs
export const validerMur = [
    body("nom").trim().notEmpty().withMessage("Le nom du mur est obligatoire"),
    body("magasin_id").isInt({ min: 1 }).withMessage("magasin_id doit être un entier valide"),
    validerResultat
];

// 6. Validation pour Produits
export const validerProduit = [
    body("nom").trim().notEmpty().withMessage("Le nom du produit est obligatoire"),
    body("upc")
        .trim()
        .isLength({ min: 12, max: 12 })
        .withMessage("Le code UPC doit contenir exactement 12 caractères"),
    body("mur_id").isInt({ min: 1 }).withMessage("mur_id doit être un entier valide"),
    validerResultat
];

// 7. Validation pour Matériels
export const validerMateriel = [
    body("code").trim().notEmpty().withMessage("Le code du matériel est obligatoire"),
    body("nom").trim().notEmpty().withMessage("Le nom du matériel est obligatoire"),
    body("quantite").isInt({ min: 0 }).withMessage("La quantité doit être un entier positif ou nul"),
    body("mur_id").isInt({ min: 1 }).withMessage("mur_id doit être un entier valide"),
    validerResultat
];