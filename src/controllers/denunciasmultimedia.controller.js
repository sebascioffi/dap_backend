import DenunciasMultimedia from "../models/DenunciasMultimedia.js"

export const crearDenunciaMultimedia = async (req, res) => {
    try {
      const denunciaMultimedia = req.body;
  
      // Crear una nueva instancia del modelo ReclamosMultimedia
      const newDenunciaMultimedia = new DenunciasMultimedia({
        idDenuncia: denunciaMultimedia.idDenuncia,
        fotos: denunciaMultimedia.fotos
      });
  
      // Guardar la nueva instancia en la base de datos
      const savedDenunciaMultimedia = await newDenunciaMultimedia.save();
  
      // Devolver una respuesta exitosa con los datos guardados
      res.status(201).json(savedDenunciaMultimedia);
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir durante la creación del reclamoMultimedia
      console.error('Error al crear denuncia multimedia:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };

  export const getDenunciaMultimediaByIdDenuncia = async (req, res) => {
    try {
      const idDenuncia = req.params.idDenuncia;
  
      // Buscar el reclamoMultimedia por idReclamo
      const denunciaMultimedia = await DenunciasMultimedia.findOne({ idDenuncia });
  
      if (!denunciaMultimedia) {
        // Si no se encuentra el reclamoMultimedia, devolver un error 404
        return res.status(404).json({ message: 'DenunciaMultimedia no encontrado' });
      }
  
      // Devolver el reclamoMultimedia encontrado
      res.status(200).json(denunciaMultimedia);
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir durante la búsqueda del reclamoMultimedia
      console.error('Error al obtener denuncia multimedia:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };

  export const deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedDenuncia = await DenunciasMultimedia.findByIdAndDelete(id);
  
      if (!deletedDenuncia) {
        return res.status(404).json({ message: "Denuncia not found" });
      }
  
      res.status(200).json({ message: "Denuncia deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting denuncia multimedia" });
    }
  };
  

  export const getDenunciasMultimedia = async (req, res) => {
    try {
      const denuncias = await DenunciasMultimedia.find();
      res.status(200).json(denuncias);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error retrieving denuncias multimedia" });
    }
  };
  


