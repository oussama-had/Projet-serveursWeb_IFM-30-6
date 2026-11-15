import database from "../config/connexion.js";
import { DataTypes } from "sequelize";

const Produit = database.define("Produit", {
    nom: { type: DataTypes.STRING(100), allowNull: false },
    upc: { type: DataTypes.STRING(12), allowNull: false },
    photo: { type: DataTypes.STRING(255), allowNull: true }
}, {
    tableName: "produits"
});

export default Produit;