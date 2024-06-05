import { pool } from "../db/connect.js";

export const getReclamos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM reclamos");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Error en Servidor" });
    }
};

export const getReclamoPorId = async (req, res) => {
    try {
        const { idReclamo } = req.params;
        const [rows] = await pool.query("SELECT * FROM reclamos WHERE idReclamo = ?", [
            idReclamo,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Reclamo Inexistente" });
        }

        const [movimientosReclamo] = await pool.query("SELECT * FROM movimientosReclamo WHERE idReclamo = ?", [
            idReclamo,
        ]);

        res.json({"reclamo": rows[0], "movimientosReclamo" : movimientosReclamo });

        //res.json(rows[0],
        //  movimientosReclamo[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en Servidor" });
    }
};

export const crearReclamo = async (req, res) => {
    try {
        const { documento , 
                idSitio, 
                idDesperfecto, 
                descripcion , 
                estado 
            } = req.body;
        const [rows] = await pool.query(
            "INSERT INTO reclamos (documento , idSitio , idDesperfecto , descripcion , estado) VALUES (?,?,?,?,?)",
            [documento,idSitio,idDesperfecto, descripcion , estado]
        );
        res.status(201).json({ id: rows.insertId, descripcion });
    } catch (error) {
        return res.status(500).json({ message: "Error en Servidor" });
    }
};

export const updateReclamo = async (req, res) => {
    try {
        const { idReclamo } = req.params;
        const { documento , 
            idSitio, 
            idDesperfecto, 
            descripcion , 
            estado 
        } = req.body;
        console.log( "idReclamo :" + idRubro);

        const [result] = await pool.query(
            "UPDATE reclamos SET documento = ? , idSitio = ?, idDesperfecto = ? , descripcion = ? , estado = ?  WHERE idReclamo = ?",
            [documento, idSitio , idDesperfecto , descripcion , estado, idReclamo]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Reclamo inexistente" });

        const [rows] = await pool.query("SELECT * FROM reclamos WHERE idReclamo = ?", [
            idReclamo,
        ]);

        res.json(rows[0]);
    } catch (error) {
        console.log (error);
        return res.status(500).json({ message: "Error en servidor" });
    }
};

export const deleteReclamo = async (req, res) => {
    try {
        const { idReclamo } = req.params;
        const [rows] = await pool.query("DELETE FROM reclamos WHERE idReclamo = ?", [idReclamo]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Reclamo inexistente" });
        }
        const [movimientosReclamo] = await pool.query("DELETE FROM movimientosReclamo WHERE idReclamo = ?", [idReclamo]);
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Error en servidor" });
    }
};

export const getFiltrarPorEstado = async (req, res) => {
    try {
        const { estado } = req.params;
        console.log(req.params);
        const [rows] = await pool.query("SELECT * FROM reclamos WHERE estado = ?", [
            estado,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Reclamo Inexistente" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error en Servidor" });
    }
};

export const getFiltrarPorDesperfecto = async (req, res) => {
    try {
        const { idDesperfecto } = req.params;
        const [rows] = await pool.query("SELECT * FROM reclamos WHERE idDesperfecto = ?", [
            idDesperfecto,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Reclamo Inexistente" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error en Servidor" });
    }
};