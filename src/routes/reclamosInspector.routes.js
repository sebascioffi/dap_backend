import { Router } from 'express';
import { check } from 'express-validator';
import { 
    getReclamos, 
    getReclamoPorId,
    crearReclamo,
    updateReclamo,
    deleteReclamo,
    getFiltrarPorEstado,
    getFiltrarPorDesperfecto
} from '../controllers/reclamosInspector.controller.js';
//import jwtValidator from ('../middlewares/jwtValidator');
import checkFields from '../middlewares/validateFields.js';

const router = Router();

router.get('/',getReclamos); //GET Reclamos.

router.get('/:idReclamo',getReclamoPorId); //GET Reclamo por ID

router.post('/',[
    check('legajo').not().isEmpty(),
    check('idSitio').not().isEmpty(),
    check('idDesperfecto').not().isEmpty(),
    check('descripcion').not().isEmpty(),
    check('estado').not().isEmpty(),
    checkFields
],crearReclamo); //POST Reclamo.

router.put('/:idReclamo',updateReclamo); //PUT Reclamo.

router.delete('/:idReclamo',deleteReclamo); //DELETE Reclamo. 

router.get('/filtrarPorEstado/:estado',getFiltrarPorEstado); //GET Filtrar por estado de reclamo

router.get('/filtrarPorDesperfecto/:idDesperfecto',getFiltrarPorDesperfecto); //GET Filtrar por desperfecto de reclamo


export default router;