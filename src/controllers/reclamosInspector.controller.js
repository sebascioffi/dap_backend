import { pool } from "../db/connect.js";

export const getReclamos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM reclamosInspector");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Error en Servidor" });
    }
};

export const getReclamoPorId = async (req, res) => {
    try {
        const { idReclamo } = req.params;
        const [rows] = await pool.query("SELECT * FROM reclamosInspector WHERE idReclamo = ?", [
            idReclamo,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Reclamo Inexistente" });
        }

        const [movimientosReclamo] = await pool.query("SELECT * FROM movimientosReclamoInspector WHERE idReclamo = ?", [
            idReclamo,
        ]);

        res.json({"reclamoInspector": rows[0], "movimientosReclamoInspector" : movimientosReclamo });

        //res.json(rows[0],
        //  movimientosReclamo[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en Servidor" });
    }
};

export const crearReclamo = async (req, res) => {
    try {
        const { legajo, idSitio, idDesperfecto, descripcion, estado } = req.body;

        // Obtener el mayor idReclamo de la tabla reclamos
        const [maxReclamosRows] = await pool.query("SELECT MAX(idReclamo) AS maxIdReclamo FROM reclamos");
        const maxIdReclamoReclamos = maxReclamosRows[0].maxIdReclamo || 0;

        // Obtener el mayor idReclamo de la tabla reclamosInspector
        const [maxReclamosInspectorRows] = await pool.query("SELECT MAX(idReclamo) AS maxIdReclamo FROM reclamosInspector");
        const maxIdReclamoReclamosInspector = maxReclamosInspectorRows[0].maxIdReclamo || 0;

        // Obtener el nuevo idReclamo como el mayor de los dos + 1
        const newIdReclamo = Math.max(maxIdReclamoReclamos, maxIdReclamoReclamosInspector) + 1;

        // Insertar el nuevo reclamo en la tabla reclamosInspector con el nuevo idReclamo
        const [rows] = await pool.query(
            "INSERT INTO reclamosInspector (idReclamo, legajo, idSitio, idDesperfecto, descripcion, estado) VALUES (?, ?, ?, ?, ?, ?)",
            [newIdReclamo, legajo, idSitio, idDesperfecto, descripcion, estado]
        );

        res.status(201).json({ id: newIdReclamo, descripcion });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en Servidor" });
    }
};

export const updateReclamo = async (req, res) => {
    try {
        const { idReclamo } = req.params;
        const {
            estado 
        } = req.body;
        
        const [result] = await pool.query(
            "UPDATE reclamosInspector SET estado = ?  WHERE idReclamo = ?",
            [estado, idReclamo]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Reclamo inexistente" });

        const [rows] = await pool.query("SELECT * FROM reclamosInspector WHERE idReclamo = ?", [
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
        const [rows] = await pool.query("DELETE FROM reclamosInspector WHERE idReclamo = ?", [idReclamo]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Reclamo inexistente" });
        }
        const [movimientosReclamo] = await pool.query("DELETE FROM movimientosReclamoInspector WHERE idReclamo = ?", [idReclamo]);
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Error en servidor" });
    }
};

export const getFiltrarPorEstado = async (req, res) => {
    try {
        const { estado } = req.params;
        console.log(req.params);
        const [rows] = await pool.query("SELECT * FROM reclamosInspector WHERE estado = ?", [
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
        const [rows] = await pool.query("SELECT * FROM reclamosInspector WHERE idDesperfecto = ?", [
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


export const getFiltrarPorInspector = async (req, res) => {
    try {
        const { idInspector } = req.params;

        // Obtener el sector del personal a partir del legajo
        const [personalRows] = await pool.query(
            'SELECT sector FROM personal WHERE legajo = ?',
            [idInspector]
        );

        if (personalRows.length === 0) {
            return res.status(404).json({ message: 'Inspector no encontrado' });
        }

        const sector = personalRows[0].sector;

        // Obtener todos los reclamos relacionados con el sector
        const [reclamosRows] = await pool.query(`
            SELECT r.* 
            FROM reclamosinspector r
            JOIN desperfectos d ON r.idDesperfecto = d.idDesperfecto
            JOIN rubros rb ON d.idRubro = rb.idRubro
            JOIN personal p ON rb.descripcion = p.sector
            WHERE p.sector = ?`,
            [sector]
        );

        res.status(200).json(reclamosRows);
    } catch (error) {
        console.error('Error al filtrar reclamos por inspector:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};