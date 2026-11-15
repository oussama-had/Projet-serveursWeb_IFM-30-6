import database from "../config/connexion.js";
import { DataTypes } from "sequelize";

const Utilisateur = database.define("Utilisateur", {
    nom: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    mot_de_passe: { type: DataTypes.STRING(255), allowNull: false }
}, {
    tableName: "utilisateurs"
});

export default Utilisateur;