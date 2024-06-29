import ReclamosMultimediaInspector from "../models/ReclamosMultimediaInspector.js";


export const crearReclamoMultimedia = async (req, res) => {
    try {
      const reclamoMultimedia = req.body;
  
      // Crear una nueva instancia del modelo ReclamosMultimedia
      const newReclamoMultimedia = new ReclamosMultimediaInspector({
        idReclamo: reclamoMultimedia.idReclamo,
        fotos: reclamoMultimedia.fotos
      });
  
      // Guardar la nueva instancia en la base de datos
      const savedReclamoMultimedia = await newReclamoMultimedia.save();
  
      // Devolver una respuesta exitosa con los datos guardados
      res.status(201).json(savedReclamoMultimedia);
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir durante la creación del reclamoMultimedia
      console.error('Error al crear reclamo multimedia inspector:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };

  export const getReclamoMultimediaByIdReclamo = async (req, res) => {
    try {
      const idReclamo = req.params.idReclamo;
  
      // Buscar el reclamoMultimedia por idReclamo
      const reclamoMultimedia = await ReclamosMultimediaInspector.findOne({ idReclamo });
  
      if (!reclamoMultimedia) {
        // Si no se encuentra el reclamoMultimedia, devolver un error 404
        return res.status(404).json({ message: 'ReclamosMultimediaInspector no encontrado' });
      }
  
      // Devolver el reclamoMultimedia encontrado
      res.status(200).json(reclamoMultimedia);
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir durante la búsqueda del reclamoMultimedia
      console.error('Error al obtener reclamo multimedia inspector:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };

  export const deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedReclamo = await ReclamosMultimediaInspector.findByIdAndDelete(id);
  
      if (!deletedReclamo) {
        return res.status(404).json({ message: "Reclamo inspector not found" });
      }
  
      res.status(200).json({ message: "Reclamo deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting reclamo multimedia inspector" });
    }
  };
  

  export const getReclamosMultimedia = async (req, res) => {
    try {
      const reclamos = await ReclamosMultimediaInspector.find();
      res.status(200).json(reclamos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error retrieving reclamos multimedia inspector" });
    }
  };
  


