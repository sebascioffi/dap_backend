import { Router } from 'express';
import { check } from 'express-validator';
import { 
    getDesperfectos, 
    getDesperfectoPorId
} from '../controllers/desperfectos.controller.js';
//import jwtValidator from ('../middlewares/jwtValidator');
import checkFields from '../middlewares/validateFields.js';

const router = Router();

router.get('/',getDesperfectos); //GET Sitios.

router.get('/:idDesperfecto',getDesperfectoPorId); //GET Sitio. BY ID

/*
router.get('/buscarPorEstado',[
    check('jwt').not().isEmpty(),
    checkFields
],jwtValidator,promocionController.getPromocionesPorEstado); //GET promocion por Estado
*/ 
/*
router.post('/',[
    //check('jwt').not().isEmpty(),
    check('latitud').not().isEmpty(),
    check('longitud').not().isEmpty(),
    check('calle').not().isEmpty(),
    check('descripcion').not().isEmpty(),
    check('descripcion').not().isEmpty(),
    check('descripcion').not().isEmpty(),
    check('descripcion').not().isEmpty(),
    checkFields
],crearRubro); //POST Rubro.

router.put('/:idRubro',updateRubro) //PUT Rubro.

router.delete('/:idRubro',deleteRubro) //DELETE Rubro. 
*/
export default router;