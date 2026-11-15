import database from "../config/connexion.js";
import { DataTypes } from "sequelize";

const Magasin = database.define("Magasin", {
    nom: { type: DataTypes.STRING(100), allowNull: false },
    adresse: { type: DataTypes.STRING(255), allowNull: false }
}, {
    tableName: "magasins"
});

export default Magasin;