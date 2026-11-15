import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { configDotenv } from "dotenv";

// 1. Importer les modèles et leurs relations pour créer les tables dans MySQL
import { Role, Utilisateur, Magasin, Mur, Produit, Materiel } from "./models/relation.js";
import database from "./config/connexion.js";

// 2. Routes 
 import roleRoute from "./routes/roleRoute.js";
 import utilisateurRoute from "./routes/utilisateurRoute.js";
 import magasinRoute from "./routes/magasinRoute.js";
 import murRoute from "./routes/murRoute.js";
 import produitRoute from "./routes/produitRoute.js";
 import materielRoute from "./routes/materielRoute.js";

configDotenv();

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Rend le dossier photos accessible

// 3. Synchronisation avec MySQL (crée automatiquement tes 6 tables)
try {
    await database.sync({ alter: true });
    console.log("Tables synchronisées avec succès !");
} catch (error) {
    console.log(error);
}

// 4. Déclaration des routes de l'API 
 app.use("/api/roles", roleRoute);
 app.use("/api/utilisateurs", utilisateurRoute);
 app.use("/api/magasins", magasinRoute);
 app.use("/api/murs", murRoute);
 app.use("/api/produits", produitRoute);
 app.use("/api/materiels", materielRoute);
 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Le serveur tourne sur le port ${PORT}`));