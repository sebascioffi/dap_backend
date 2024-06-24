import { Router } from 'express';
import { check } from 'express-validator';
import { crearDenuncia, getDenunciaPorId, getDenuncias } from '../controllers/denuncias.controller.js';
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
],crearDenuncia); //POST Reclamo.

//router.put('/:idReclamo',updateReclamo); //PUT Reclamo.

//router.delete('/:idReclamo',deleteReclamo); //DELETE Reclamo. 

//router.get('/filtrarPorEstado/:estado',getFiltrarPorEstado); //GET Filtrar por estado de reclamo

//router.get('/filtrarPorDesperfecto/:idDesperfecto',getFiltrarPorDesperfecto); //GET Filtrar por desperfecto de reclamo

//router.get('/filtrarPorInspector/:idInspector',getFiltrarPorInspector); // GET Reclamos por idInspector

/*
router.get('/buscarPorEstado',[
    check('jwt').not().isEmpty(),
    checkFields
],jwtValidator,promocionController.getPromocionesPorEstado); //GET promocion por Estado
*/ 

export default router;