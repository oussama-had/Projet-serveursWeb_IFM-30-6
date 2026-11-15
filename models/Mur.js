import database from "../config/connexion.js";
import { DataTypes } from "sequelize";

const Mur = database.define("Mur", {
    nom: { type: DataTypes.STRING(100), allowNull: false },
    photo: { type: DataTypes.STRING(255), allowNull: true }
}, {
    tableName: "murs"
});

export default Mur;