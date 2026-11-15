import database from "../config/connexion.js";
import { DataTypes } from "sequelize";

const Materiel = database.define("Materiel", {
    code: { type: DataTypes.STRING(50), allowNull: false },
    nom: { type: DataTypes.STRING(100), allowNull: false },
    quantite: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 }
}, {
    tableName: "materiels"
});

export default Materiel;