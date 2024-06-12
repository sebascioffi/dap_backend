import { pool } from "../db/connect.js";

export const getReclamos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM reclamos");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Error en Servidor" });
    }
};

export const login = async (req, res) => {
    try {
        const { legajo, password } = req.body;
        
        // Consulta SQL para verificar si existe un usuario con el legajo y la contraseña proporcionados
        const query = 'SELECT * FROM personal WHERE legajo = ? AND password = ?';
        const [rows] = await pool.query(query, [legajo, password]);

        // Verificar si se encontró algún usuario
        if (rows.length > 0) {
            // Usuario encontrado, devolver un mensaje de éxito
            return res.status(200).json({ message: 'Usuario encontrado' });
        } else {
            // No se encontró ningún usuario con el legajo y la contraseña proporcionados
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        // Manejar errores
        console.error('Error en la consulta:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};


export const getInspectorById = async (req, res) => {
    try {
        const { legajo } = req.params;

        // Realizar la consulta SQL para obtener el inspector por legajo
        const [rows] = await pool.query(
            'SELECT * FROM personal WHERE legajo = ?',
            [legajo]
        );

        // Verificar si se encontró algún inspector con el legajo dado
        if (rows.length > 0) {
            // Si se encontró, devolver el primer resultado (asumiendo que el legajo es único)
            const inspector = rows[0];
            res.status(200).json(inspector);
        } else {
            // Si no se encontró ningún inspector, devolver un mensaje indicando que no se encontró
            res.status(404).json({ message: 'Inspector no encontrado' });
        }
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la consulta
        console.error('Error al buscar inspector por legajo:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

