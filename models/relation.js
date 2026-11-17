import Role from "./Role.js";
import Utilisateur from "./Utilisateur.js";
import Magasin from "./Magasin.js";
import Mur from "./Mur.js";
import Produit from "./Produit.js";
import Materiel from "./Materiel.js";

// Relation 1..* : Role -> Utilisateur
Role.hasMany(Utilisateur, {
    foreignKey: { name: "role_id", allowNull: false },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
});
Utilisateur.belongsTo(Role, { foreignKey: "role_id" });

// Relation 1..* : Magasin -> Mur
Magasin.hasMany(Mur, {
    foreignKey: { name: "magasin_id", allowNull: false },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
});
Mur.belongsTo(Magasin, { foreignKey: "magasin_id" });

// Relation 1..* : Mur -> Produit
Mur.hasMany(Produit, {
    foreignKey: { name: "mur_id", allowNull: false },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
});
Produit.belongsTo(Mur, { foreignKey: "mur_id" });

// Relation 1..* : Mur -> Materiel
Mur.hasMany(Materiel, {
    foreignKey: { name: "mur_id", allowNull: false },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
});
Materiel.belongsTo(Mur, { foreignKey: "mur_id" });

export { Role, Utilisateur, Magasin, Mur, Produit, Materiel };