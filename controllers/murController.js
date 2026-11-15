import { Mur, Magasin, Produit, Materiel } from "../models/relation.js";

export const getAllMurs = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Mur.findAndCountAll({
            include: [Magasin, Produit, Materiel],
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

export const getMurById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Mur.findByPk(id, { include: [Magasin, Produit, Materiel] });
        if (!result) return res.status(404).json({ message: "Mur introuvable" });
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addMur = async (req, res) => {
    const { nom, magasin_id } = req.body;
    const photo = req.file ? req.file.filename : null;

    try {
        const result = await Mur.create({ nom, photo, magasin_id });
        res.status(201).json({ data: result, message: "Mur créé avec succès" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateMur = async (req, res) => {
    const { id } = req.params;
    const { nom, magasin_id } = req.body;
    const donneesMaj = { nom, magasin_id };

    if (req.file) {
        donneesMaj.photo = req.file.filename;
    }

    try {
        const result = await Mur.update(donneesMaj, { where: { id } });
        res.status(200).json({ data: result, message: "Mur mis à jour avec succès" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteMur = async (req, res) => {
    const { id } = req.params;
    try {
        await Mur.destroy({ where: { id } });
        res.status(200).json({ message: `Le mur ${id} a été supprimé avec succès` });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};