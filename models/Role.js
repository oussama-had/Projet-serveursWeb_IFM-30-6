import database from "../config/connexion.js";
import { DataTypes } from "sequelize";

const Role = database.define("Role", {
    nom: { type: DataTypes.STRING(50), allowNull: false, unique: true }
}, {
    tableName: "roles"
});

export default Role;