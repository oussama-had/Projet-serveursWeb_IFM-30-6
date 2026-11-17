import { Magasin, Mur } from "../models/relation.js";

export const getAllMagasins = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Magasin.findAndCountAll({
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

export const getMagasinById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Magasin.findByPk(id, { include: Mur });
        if (!result) return res.status(404).json({ message: "Magasin introuvable" });
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addMagasin = async (req, res) => {
    const { nom, adresse } = req.body;
    try {
        const result = await Magasin.create({ nom, adresse });
        res.status(201).json({ data: result, message: "Magasin créé avec succès" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateMagasin = async (req, res) => {
    const { id } = req.params;
    const { nom, adresse } = req.body;
    try {
        const result = await Magasin.update({ nom, adresse }, { where: { id } });
        res.status(200).json({ data: result, message: "Magasin mis à jour avec succès" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteMagasin = async (req, res) => {
    const { id } = req.params;
    try {
        await Magasin.destroy({ where: { id } });
        res.status(200).json({ message: `Le magasin ${id} a été supprimé avec succès` });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};