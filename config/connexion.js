// Importer l'ORM Sequelize
import { Sequelize } from 'sequelize';

// Importer et charger les variables d'environnement (.env)
import dotenv from 'dotenv';
dotenv.config();

// Déstructuration des variables de connexion (Chapitre 2)
const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_DIALECT
} = process.env;

// Création de l'instance de connexion MySQL (Chapitre 4-5)
const connexion = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false, // Évite d'encombrer la console avec toutes les requêtes SQL brutes
    define: {
      underscored: true,  //utilise le style snake_case pour les noms de colonnes et de tables(created_at, updated_at, user_id, etc.)
      timestamps: true    //ajoute automatiquement les colonnes created_at et updated_at aux tables
    }
});

export default connexion;