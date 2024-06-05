import { serviceGetPromociones,
         serviceGetPromocionPorId,
         serviceGetPromocionesPorCategoria,
         serviceGetPromocionesPorEstado,
         serviceCrearPromocion,
         serviceUpdatePromocion,
         serviceDeletePromocion
} from "../services/promociones.service.js";
//const AuthService = require("../services/auth.service");
let instance = null;


export const getPromociones = async (req, res) => {
  try {
    const promociones = await serviceGetPromociones();
    return res.status(200).json(promociones);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getPromociones",
      message: err,
    });
  }
}
export const getPromocionPorId = async (req, res) => {
  try {
    const id = req.params.idPromocion;
    let promocion = await serviceGetPromocionPorId(id);
    if (!promocion) {
      return res.status(404).json({
        method: "getPromocionPorId",
        message: "Promocion inexistente",
      });
    }
    return res.status(200).json(promocion);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getPromocionPorId",
      message: err,
    });
  }
}

export const getPromocionesPorEstado = async (req, res) => {
  try {
    const estado = req.params.estado;
    let promociones = await serviceGetPromocionesPorEstado(estado);
    if (!promociones) {
      return res.status(400).json({
        method: "getPromocionPorEstado",
        message: "Entrada Invalida",
      });
    }
    return res.status(200).json(promociones);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getPromocionPorEstado",
      message: err,
    });
  }
}

export const getPromocionesPorCategoria = async (req, res) => {
  try {
    const categoria = req.params.estado;
    let promociones = await serviceGetPromocionesPorCategoria(categoria);
    if (!promociones) {
      return res.status(400).json({
        method: "getPromocionPorCategoria",
        message: "Entrada Invalida",
      });
    }
    return res.status(200).json(promociones);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getPromocionPorCategoria",
      message: err,
    });
  }
}

export const crearPromocion = async (req, res) => {
  try {
    const promocion = req.body;
    let newPromocion = await serviceCrearPromocion(promocion);

    return res.status(201).json({
      message: "Operacion Exitosa",
      contact: newPromocion,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "crearPromocion",
      message: err.message,
    });
  }
}

export const updatePromocion = async (req, res) => {
  try {
    let promocion = await serviceGetPromocionPorId(req.params.id);
    if (!promocion) {
      return res
        .status(404)
        .json({ method: "updatePromocion", message: "Promocion inexistente" });
    }
    const promocionModificada = await serviceUpdatePromocion(
      req.params.id,
      req.body,
      promocion
    );
    return res.status(200).json(promocionModificada);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "updateContact",
      message: err,
    });
  }
}


export const deletePromocion = async (req, res) => {
  try {
    let isPromocion = await serviceGetPromocionPorId(req.params.idPromocion);
    if (isPromocion) {
      await serviceDeletePromocion(req.params.idPromocion);
      return res.status(204).json({ message: "No Content" });
    }
    return res.status(404).json({ message: "Promocion inexistente" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "deletePromocion",
      message: err,
    });
  }
}


