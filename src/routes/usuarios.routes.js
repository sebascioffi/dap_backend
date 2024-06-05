import Router from "express";
import usuariosController from "../controllers/usuarios.controller.js";
import validateJwt from '../middlewares/jwtValidator.js';
import checkFields from '../middlewares/validateFields.js';
import { check } from "express-validator";

const router = Router();

router.get("/", usuariosController.getUsuarios); //GET USUARIOS

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("lastname").not().isEmpty(),
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    checkFields,
  ],
  usuariosController.createUsuario
); //POST USUARIOS



router.get("/:id", usuariosController.getUsuarioById); //GET USUARIOS BY ID
router.post(
  "/login",
  [
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    checkFields,
  ],
  usuariosController.login
);
router.delete('/:id',[
  check('jwt').not().isEmpty(),
  checkFields
],validateJwt,usuariosController.deleteUsuario
); 

export default router;