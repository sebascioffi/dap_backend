let instance = null;
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import UsuariosService from '../services/usuarios.service.js';
import AuthService from '../services/auth.service.js';
import { pool } from '../db/connect.js';

class UsuariosController {

  static getInstance() {
    if (!instance) {
      return new UsuariosController();
    }
    return instance;
  }

  async getUsuarios(req, res) {
    try {
      const users = await UsuariosService.getUsers();
      return res.status(200).json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getUsers",
        message: err,
      });
    }
  }

  async getUsuarioById(req, res) {
    try {
      const id = req.params.id;
      let user = await UsuariosService.getUserById(id);
      if (!user) {
        return res.status(404).json({
          method: "getUsuarioById",
          message: "Not Found",
        });
      }
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getUsuarioById",
        message: err,
      });
    }
  }

  async getUsuarioByDniSql(req, res) {
    const dni = req.params.dni;
    try {
      const [rows] = await pool.query(
        "SELECT * FROM vecinos WHERE documento = ?",
        [dni]
      );
      if (rows.length > 0) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).json({ message: "Vecino no encontrado" });
      }
    } catch (error) {
      console.error('Error en la consulta SQL:', error);
      res.status(500).json({ message: "Error en Servidor" });
    }
  }

  async getUsuarioByDni(req, res) {
    try {
      const dni = req.params.dni;
      let user = await UsuariosService.getUserByDni(dni);
      if (!user) {
        return res.status(404).json({
          method: "getUsuarioByDni",
          message: "Not Found",
        });
      }
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getUsuarioById",
        message: err,
      });
    }
  }

  async solicitudClave(req, res) {
    try {
      console.log("Solicitud Clave" + req.body)
      const documento = req.body.dni;
      const email = req.body.email;

      const [rows] = await pool.query("SELECT * FROM VECINOS WHERE DOCUMENTO = ?", [
        documento,
      ]);

      if (rows.length <= 0) {
        return res.status(404).json({ message: "Vecino Inexistente" });
      }
      else{
        let user = {
          dni:rows[0].documento,
          nombre:rows[0].nombre,
          apellido:rows[0].apellido,
          email:email,
          password:rows[0].documento,
          direccion:rows[0].direccion,
        }
        console.log(user);
        let newUser = await UsuariosService.solicitudClave(user);
        return res.status(201).json({
          message: "Created!",
          usuario: newUser,
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "solicitudClave",
        message: err.message,
      });
    }
  }

  async generarClave(req, res) {
    try {
      console.log("Generar Clave" + req.body)
      let newUser = await UsuariosService.generarClave(req.body);

      return res.status(201).json({
        message: "Created!",
        usuario: newUser,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "createUsuario",
        message: err.message,
      });
    }
  }

  async createUsuario(req, res) {
    try {
      console.log("Peticiones Usuario" + req.body)
      let newUser = await UsuariosService.createUser(req.body);

      return res.status(201).json({
        message: "Created!",
        usuario: newUser,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "createUsuario",
        message: err.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { dni, password } = req.body;
      const { found, validPassword } = await AuthService.hasValidCredentials(dni, password);

      if (!found) {
        return res.status(404).json({
          status: 404,
          message: "User not found.",
        });
      } else if (!validPassword) {
        return res.status(401).json({
          status: 401,
          message: "Incorrect password.",
        });
      } else {
        console.log("generar token");
        const user = await UsuariosService.getUserByDni(dni);
        if (user.habilitado === false) {
          return res.status(403).json({
            status: 403,
            message: "User is disabled.",
          });
        }

        const token = jwt.sign(user.toJSON(), process.env.PRIVATE_KEY, {
          expiresIn: "1d",
        });

        return res.status(200).json({
          status: 200,
          token,
          user,
          message: "Token created successfully."
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        status: 500,
        method: "login",
        message: err.message,
      });
    }
  }


  async deleteUsuario(req, res) {
    try {
      let isUser = await UsuariosService.getUserById(req.params.id);
      if (isUser) {
        await UsuariosService.deleteUser(req.params.id);
        return res.status(204).json({ message: "No Content" });
      }
      return res.status(404).json({ method: "deleteUser", message: "Not Found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "deleteUser",
        message: err.message
      });
    }
  }

  async habilitarUsuario(req, res) {
    try {
      const dni = req.params.dni;
      let user = await UsuariosService.getUserByDni(dni);
  
      if (!user) {
        return res.status(404).json({
          method: "habilitarUsuario",
          message: "Not Found",
        });
      }
  
      user.habilitado = true;
      await user.save();
  
      return res.status(200).json({
        method: "habilitarUsuario",
        message: "User habilitated successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "habilitarUsuario",
        message: err.message,
      });
    }
  }
}

export default UsuariosController.getInstance();
