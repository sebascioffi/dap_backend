import ReclamosMultimedia from "../models/ReclamosMultimedia.js";


export const crearReclamoMultimedia = async (req, res) => {
    try {
      const reclamoMultimedia = req.body;
  
      // Crear una nueva instancia del modelo ReclamosMultimedia
      const newReclamoMultimedia = new ReclamosMultimedia({
        idReclamo: reclamoMultimedia.idReclamo,
        fotos: reclamoMultimedia.fotos
      });
  
      // Guardar la nueva instancia en la base de datos
      const savedReclamoMultimedia = await newReclamoMultimedia.save();
  
      // Devolver una respuesta exitosa con los datos guardados
      res.status(201).json(savedReclamoMultimedia);
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir durante la creación del reclamoMultimedia
      console.error('Error al crear reclamo multimedia:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };

  export const getReclamoMultimediaByIdReclamo = async (req, res) => {
    try {
      const idReclamo = req.params.idReclamo;
  
      // Buscar el reclamoMultimedia por idReclamo
      const reclamoMultimedia = await ReclamosMultimedia.findOne({ idReclamo });
  
      if (!reclamoMultimedia) {
        // Si no se encuentra el reclamoMultimedia, devolver un error 404
        return res.status(404).json({ message: 'ReclamoMultimedia no encontrado' });
      }
  
      // Devolver el reclamoMultimedia encontrado
      res.status(200).json(reclamoMultimedia);
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir durante la búsqueda del reclamoMultimedia
      console.error('Error al obtener reclamo multimedia:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };

  export const deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedReclamo = await ReclamosMultimedia.findByIdAndDelete(id);
  
      if (!deletedReclamo) {
        return res.status(404).json({ message: "Reclamo not found" });
      }
  
      res.status(200).json({ message: "Reclamo deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting reclamo multimedia" });
    }
  };
  

  export const getReclamosMultimedia = async (req, res) => {
    try {
      const reclamos = await ReclamosMultimedia.find();
      res.status(200).json(reclamos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error retrieving reclamos multimedia" });
    }
  };
  


