import { Router } from 'express';
import { crearReclamoMultimedia, deleteById, getReclamoMultimediaByIdReclamo, getReclamosMultimedia,
        } from '../controllers/reclamosmultimedia.controller.js';

const router = Router();

router.post('/',crearReclamoMultimedia);

router.get('/', getReclamosMultimedia);

router.get('/:idReclamo',getReclamoMultimediaByIdReclamo);

router.delete('/:id', deleteById);


export default router;