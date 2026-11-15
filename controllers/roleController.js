import { Role } from "../models/relation.js";

export const getAllRoles = async (req, res) => {
    try {
        const result = await Role.findAll();
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getRoleById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Role.findByPk(id);
        if (!result) return res.status(404).json({ message: "Rôle introuvable" });
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addRole = async (req, res) => {
    const { nom } = req.body;
    try {
        const result = await Role.create({ nom });
        res.status(201).json({ data: result, message: "Rôle créé avec succès" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateRole = async (req, res) => {
    const { id } = req.params;
    const { nom } = req.body;
    try {
        const result = await Role.update({ nom }, { where: { id } });
        res.status(200).json({ data: result, message: "Rôle mis à jour avec succès" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        await Role.destroy({ where: { id } });
        res.status(200).json({ message: `Le rôle ${id} a été supprimé avec succès` });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};