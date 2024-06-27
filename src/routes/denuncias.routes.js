import { Router } from 'express';
import { check } from 'express-validator';
import { 
    crearDenuncia, 
    getDenunciaPorId, 
    getDenuncias,
    getFiltrarPorEstado,
    getFiltrarPorVecino,
    getVecinosDenunciados
} from '../controllers/denuncias.controller.js';
import checkFields from '../middlewares/validateFields.js';

const router = Router();

router.get('/',getDenuncias); //GET Reclamos.

router.get('/:idDenuncia',getDenunciaPorId); //GET Reclamo por ID

router.post('/',[
    check('documento').not().isEmpty(),
    check('idSitio').not().isEmpty(),
    check('descripcion').not().isEmpty(),
    check('estado').not().isEmpty(),
    check('aceptaResponsabilidad').not().isEmpty(),
    checkFields
],crearDenuncia); 

router.get('/filtrarPorEstado/:estado',getFiltrarPorEstado); //GET Filtrar por estado de reclamo

router.get('/filtrarPorVecino/:documento',getFiltrarPorVecino); // GET Reclamos por dni vecino

router.get('/vecinosDenunciados/:documento',getVecinosDenunciados); // GET Reclamos por dni vecino

export default router;