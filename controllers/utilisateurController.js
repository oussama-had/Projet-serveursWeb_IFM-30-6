import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Utilisateur, Role } from "../models/relation.js";

export const getAllUtilisateurs = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Utilisateur.findAndCountAll({
            include: Role,
            attributes: { exclude: ["mot_de_passe"] },
            limit,
            offset
        });
        res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: rows
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUtilisateurById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Utilisateur.findByPk(id, {
            include: Role,
            attributes: { exclude: ["mot_de_passe"] }
        });
        if (!result) return res.status(404).json({ message: "Utilisateur introuvable" });
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addUtilisateur = async (req, res) => {
    const { nom, email, mot_de_passe, role_id } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(mot_de_passe, 10);
        const result = await Utilisateur.create({
            nom,
            email,
            mot_de_passe: hashedPassword,
            role_id
        });
        res.status(201).json({ data: result, message: "Utilisateur créé avec succès" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, mot_de_passe } = req.body;
    if (!email || !mot_de_passe) {
        return res.status(400).json({ message: "Email et mot de passe requis !" });
    }

    try {
        const utilisateur = await Utilisateur.findOne({ where: { email }, include: Role });
        if (!utilisateur) {
            return res.status(404).json({ message: "Cet utilisateur n'existe pas" });
        }

        const verifyPassword = bcrypt.compareSync(mot_de_passe, utilisateur.mot_de_passe);
        if (!verifyPassword) {
            return res.status(401).json({ message: "Le mot de passe est incorrect" });
        }

        const token = jwt.sign({ id: utilisateur.id }, process.env.CODE_SECRET);
        res.status(200).json({ data: utilisateur, token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const updateUtilisateur = async (req, res) => {
    const { id } = req.params;
    const { nom, email, role_id } = req.body;
    try {
        const result = await Utilisateur.update({ nom, email, role_id }, { where: { id } });
        res.status(200).json({ data: result, message: "Utilisateur mis à jour avec succès" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteUtilisateur = async (req, res) => {
    const { id } = req.params;
    try {
        await Utilisateur.destroy({ where: { id } });
        res.status(200).json({ message: `L'utilisateur ${id} a été supprimé avec succès` });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};