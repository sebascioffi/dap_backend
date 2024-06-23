import Promocion from "../models/Promocion.js";

export const serviceGetPromociones = async () => {
  try {
    const promociones = await Promocion.find();
    return promociones;
  } catch (err) {
    console.error(err);
    throw new Error("Error in getPromociones Service");
  }
}

export const serviceGetPromocionPorId = async (id) => {
  try {
    console.log(id);
    let promocion = await Promocion.findOne({ _id: id });
    return promocion;
  } catch (err) {
    console.error(err);
    throw new Error("Error in getPromocionPorId Service");
  }
}

export const serviceGetPromocionesPorEstado = async (estado) => {
  try {
    let promocion = await Promocion.find({ estado: estado });
    return promocion;
  } catch (err) {
    console.error(err);
    throw new Error("Error in getPromocionesPorEstado Service");
  }
}

export const serviceGetPromocionesPorCategoria = async (categoria) => {
  try {
    let promociones = await Promocion.find({ categoria: categoria });
    return promociones;
  } catch (err) {
    console.error(err);
    throw new Error("Error in getPromocionesPorCategoria Service");
  }
}

export const serviceCrearPromocion = async (promocion) => {
  try {
    console.log(promocion);
    promocion.estado = "PENDIENTE";
    let promocionCreada = await Promocion.create(promocion);
    return promocionCreada;

  } catch (err) {
    console.error(err);
    throw new Error("Error in crearPromocion Service", err);
  }
}

export const serviceUpdatePromocion = async (id, fields) => {
  try {
    // Encuentra y actualiza la promoción con los campos proporcionados
    const promocion = await Promocion.findOneAndUpdate(
      { _id: id },
      { $set: fields },
      { new: true } // Esto devuelve la promoción actualizada
    );

    return promocion;
  } catch (err) {
    console.error(err);
    throw new Error("Error in updatePromocion Service");
  }
}


export const serviceDeletePromocion = async (id) => {
  try {
    await Promocion.findOneAndDelete({ _id: id });
  } catch (err) {
    console.error(err);
    throw new Error("Error in deleteContact Service");
  }
}

