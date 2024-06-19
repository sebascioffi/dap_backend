import Router from "express";
import usuariosController from "../controllers/usuarios.controller.js";
import validateJwt from '../middlewares/jwtValidator.js';
import checkFields from '../middlewares/validateFields.js';
import { check } from "express-validator";

const router = Router();

router.get("/", usuariosController.getUsuarios); //GET USUARIOS

router.post(
  "/solicitudClave",
  [
    check("dni").not().isEmpty(), 
    check("email").not().isEmpty(),
    checkFields,
  ],
  usuariosController.solicitudClave,
); //POST USUARIOS

router.post(
  "/generarClave",
  [
    check("dni").not().isEmpty(), 
    check("password").not().isEmpty(),
    checkFields,
  ],
  usuariosController.generarClave
);


router.get("/:id", usuariosController.getUsuarioById); //GET USUARIOS BY ID

router.get("/buscar/:dni", usuariosController.getUsuarioByDniSql);

router.get("/buscarPorDni/:dni", usuariosController.getUsuarioByDni); //GET USUARIOS BY DNI


router.post(
  "/login",
  [
    check("dni").not().isEmpty(),
    check("password").not().isEmpty(),
    checkFields,
  ],
  usuariosController.login
);
router.delete('/:id',[],usuariosController.deleteUsuario
); 

export default router;