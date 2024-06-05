import { Router } from 'express';
import { check } from 'express-validator';
import { 
    getRubros, 
    getRubroPorId,
    crearRubro,
    updateRubro,
    deleteRubro
} from '../controllers/rubro.controller.js';
//import jwtValidator from ('../middlewares/jwtValidator');
import checkFields from '../middlewares/validateFields.js';

const router = Router();

router.get('/',getRubros); //GET Rubros.

router.get('/:idRubro',getRubroPorId); //GET promocion. BY ID

/*
router.get('/buscarPorEstado',[
    check('jwt').not().isEmpty(),
    checkFields
],jwtValidator,promocionController.getPromocionesPorEstado); //GET promocion por Estado
*/ 

router.post('/',[
    //check('jwt').not().isEmpty(),
    check('descripcion').not().isEmpty(),
    checkFields
],crearRubro); //POST Rubro.

router.put('/:idRubro',updateRubro) //PUT Rubro.

router.delete('/:idRubro',deleteRubro) //DELETE Rubro. 

export default router;