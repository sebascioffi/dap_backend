import { pool } from "../db/connect.js";

export const getDesperfectos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM DESPERFECTOS");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Error en Servidor" });
    }
};

export const getDesperfectoPorId = async (req, res) => {
    try {
        const { idDesperfecto } = req.params;
        const [rows] = await pool.query("SELECT * FROM DESPERFECTOS WHERE idDesperfecto = ?", [
            idDesperfecto,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Desperfecto Inexistente" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error en Servidor" });
    }
};
/*
export const crearRubro = async (req, res) => {
    try {
        const { descripcion } = req.body;
        const [rows] = await pool.query(
            "INSERT INTO rubros (descripcion) VALUES (?)",
            [descripcion]
        );
        res.status(201).json({ id: rows.insertId, descripcion });
    } catch (error) {
        return res.status(500).json({ message: "Error en Servidor" });
    }
};

export const updateRubro = async (req, res) => {
    try {
        const { idRubro } = req.params;
        const { descripcion } = req.body;
        console.log( "IdRubro :" + idRubro);
        console.log( "descripcion :" + descripcion);

        const [result] = await pool.query(
            "UPDATE rubros SET descripcion = IFNULL(?, descripcion) WHERE idRubro = ?",
            [descripcion, idRubro]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Rubro inexistente" });

        const [rows] = await pool.query("SELECT * FROM rubros WHERE idRubro = ?", [
            idRubro,
        ]);

        res.json(rows[0]);
    } catch (error) {
        console.log (error);
        return res.status(500).json({ message: "Error en servidor" });
    }
};

export const deleteRubro = async (req, res) => {
    try {
        const { idRubro } = req.params;
        const [rows] = await pool.query("DELETE FROM rubros WHERE idRubro = ?", [idRubro]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Rubro inexistente" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Error en servidor" });
    }
};
*/