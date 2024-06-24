import { Router } from 'express';
import { crearDenunciaMultimedia, getDenunciasMultimedia, getDenunciaMultimediaByIdDenuncia, deleteById,
        } from '../controllers/denunciasmultimedia.controller.js';

const router = Router();

router.post('/',crearDenunciaMultimedia);

router.get('/', getDenunciasMultimedia);

router.get('/:idDenuncia',getDenunciaMultimediaByIdDenuncia);

router.delete('/:id', deleteById);


export default router;