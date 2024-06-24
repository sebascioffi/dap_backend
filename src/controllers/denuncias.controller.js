import { pool } from "../db/connect.js";

export const getDenuncias = async (req, res) => {
  try {
      const [rows] = await pool.query("SELECT * FROM denuncias");
      res.json(rows);
  } catch (error) {
      return res.status(500).json({ message: "Error en Servidor" });
  }
};

export const getDenunciaPorId = async (req, res) => {
  try {
      const { idDenuncia } = req.params;
      const [rows] = await pool.query("SELECT * FROM denuncias WHERE idDenuncia = ?", [
          idDenuncia,
      ]);

      if (rows.length <= 0) {
          return res.status(404).json({ message: "Denuncia Inexistente" });
      }

      const [movimientosDenuncia] = await pool.query("SELECT * FROM movimientosDenuncia WHERE idDenuncia = ?", [
          idDenuncia,
      ]);

      res.json({"denuncia": rows[0], "movimientosDenuncia" : movimientosDenuncia });

  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error en Servidor" });
  }
};

export const crearDenuncia = async (req, res) => {
  try {
      const { documento , 
              idSitio, 
              descripcion , 
              estado ,
              aceptaResponsabilidad
          } = req.body;
          console.log("DOCUMENTO :" + documento);
      const [rows] = await pool.query(
          "INSERT INTO denuncias (documento , idSitio , descripcion , estado, aceptaResponsabilidad) VALUES (?,?,?,?,?)",
          [documento,idSitio, descripcion , estado, aceptaResponsabilidad]
      );
      res.status(201).json({ id: rows.insertId, descripcion });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error en Servidor" });
  }
};


export const getFiltrarPorEstado = async (req, res) => {
    try {
        const { estado } = req.params;
        console.log(req.params);
        const [rows] = await pool.query("SELECT * FROM DENUNCIAS WHERE estado = ?", [
            estado,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Denuncia Inexistente" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error en Servidor" });
    }
};

export const getFiltrarPorVecino = async (req, res) => {
    try {
        const { documento } = req.params;
        console.log("documento :" + documento);

        const [rows] = await pool.query("SELECT * FROM DENUNCIAS WHERE documento = ?", [
            documento ,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Vecino sin denuncias cargadas" });
        }

        res.json(rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en Servidor" });
    }
};
