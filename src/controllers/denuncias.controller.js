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
              aceptaResponsabilidad,
              documentoDenunciado
          } = req.body;
          console.log("DOCUMENTO :" + documento);
      const [rows] = await pool.query(
          "INSERT INTO denuncias (documento , idSitio , descripcion , estado, aceptaResponsabilidad) VALUES (?,?,?,?,?)",
          [documento,idSitio, descripcion , estado, aceptaResponsabilidad]
      );
      // Verificar si documentoVecino no es vacío y si existe en la tabla vecinos
    if (documentoDenunciado !== "") {
        const [vecinoRows] = await pool.query(
          "SELECT * FROM vecinos WHERE documento = ?",
          [documentoDenunciado]
        );
  
        if (vecinoRows.length > 0) {
          // Si existe, insertar en la tabla vecinosdenunciados
          await pool.query(
            "INSERT INTO vecinosdenunciados (idDenuncia, documento) VALUES (?,?)",
            [rows.insertId, documentoDenunciado]
          );
        }
      }
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

export const getVecinosDenunciados = async (req, res) => {
    try {
        const { documento } = req.params;
        console.log("documento :" + documento);
        const [rows] = await pool.query("SELECT A.* FROM DENUNCIAS A, VECINOSDENUNCIADOS B WHERE A.idDenuncia = B.idDenuncia AND b.documento = ?", [
            documento,
        ]);
        if (rows.length <= 0) {
            return res.status(200).json({ message: "Vecino sin denuncias cargadas" });
        }
        res.json(rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en Servidor" });
    }
};

export const updateDenuncia = async (req, res) => {
    try {
        const { idDenuncia } = req.params;
        const { 
            estado 
        } = req.body;

        const [result] = await pool.query(
            "UPDATE denuncias SET estado = ?  WHERE idDenuncia = ?",
            [estado, idDenuncia]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Denuncia inexistente" });

        const [rows] = await pool.query("SELECT * FROM denuncias WHERE idDenuncia = ?", [
            idDenuncia,
        ]);

        res.json(rows[0]);
    } catch (error) {
        console.log (error);
        return res.status(500).json({ message: "Error en servidor" });
    }
};