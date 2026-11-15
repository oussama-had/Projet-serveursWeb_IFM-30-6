import { Produit, Mur } from "../models/relation.js";

export const getAllProduits = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Produit.findAndCountAll({
            include: Mur,
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

export const getProduitById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Produit.findByPk(id, { include: Mur });
        if (!result) return res.status(404).json({ message: "Produit introuvable" });
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addProduit = async (req, res) => {
    const { nom, upc, mur_id } = req.body;
    const photo = req.file ? req.file.filename : null;

    try {
        const result = await Produit.create({ nom, upc, photo, mur_id });
        res.status(201).json({ data: result, message: "Produit créé avec succès" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProduit = async (req, res) => {
    const { id } = req.params;
    const { nom, upc, mur_id } = req.body;
    const donneesMaj = { nom, upc, mur_id };

    if (req.file) {
        donneesMaj.photo = req.file.filename;
    }

    try {
        const result = await Produit.update(donneesMaj, { where: { id } });
        res.status(200).json({ data: result, message: "Produit mis à jour avec succès" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteProduit = async (req, res) => {
    const { id } = req.params;
    try {
        await Produit.destroy({ where: { id } });
        res.status(200).json({ message: `Le produit ${id} a été supprimé avec succès` });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};