import { Router } from 'express';
import { getPromociones,
         getPromocionPorId,
         getPromocionesPorEstado,
         getPromocionesPorCategoria,
         crearPromocion,
         updatePromocion,
         deletePromocion 
        } from '../controllers/promociones.controller.js';
//import { jwtValidator } from '../middlewares/jwtValidator.js';
//import { checkFields }  from '../middlewares/validateFields.js';
//import { check } from 'express-validator';

const router = Router();

router.get('/', getPromociones); //GET promocion.

router.get('/:idPromocion',getPromocionPorId); //GET promocion. BY ID

router.get('/buscarPorEstado',getPromocionesPorEstado); //GET promocion por Estado

router.get('/buscarPorCategoria',getPromocionesPorCategoria); //GET promocion por Estado

router.post('/',crearPromocion); //POST promocion.

router.put('/:idPromocion',updatePromocion) //PUT promocion.

router.delete('/:idPromocion',deletePromocion) //DELETE promocion. 

export default router;