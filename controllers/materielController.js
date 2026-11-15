import { Materiel, Mur } from "../models/relation.js";

export const getAllMateriels = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Materiel.findAndCountAll({
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

export const getMaterielById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Materiel.findByPk(id, { include: Mur });
        if (!result) return res.status(404).json({ message: "Matériel introuvable" });
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addMateriel = async (req, res) => {
    const { code, nom, quantite, mur_id } = req.body;
    try {
        const result = await Materiel.create({ code, nom, quantite, mur_id });
        res.status(201).json({ data: result, message: "Matériel créé avec succès" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateMateriel = async (req, res) => {
    const { id } = req.params;
    const { code, nom, quantite, mur_id } = req.body;
    try {
        const result = await Materiel.update({ code, nom, quantite, mur_id }, { where: { id } });
        res.status(200).json({ data: result, message: "Matériel mis à jour avec succès" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteMateriel = async (req, res) => {
    const { id } = req.params;
    try {
        await Materiel.destroy({ where: { id } });
        res.status(200).json({ message: `Le matériel ${id} a été supprimé avec succès` });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};