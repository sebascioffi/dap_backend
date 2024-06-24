import UsuariosModel from '../models/Usuarios.js';
import bcrypt from 'bcrypt';

class UsuariosService {

  async getUsers() {
    try {
      const users = await UsuariosModel.find();
      return users;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getUsers Service");
    }
  }

  async getUserById(id) {
    try {
      let user = await UsuariosModel.findOne({ _id: id });
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getUserById Service");
    }
  }

  async getUserByDni(dni) {
    try {
      let user = await UsuariosModel.findOne({ dni });
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getUserByDni Service");
    }
  }

  async solicitudClave(user) {
    try {

      let isUserRegistered = await UsuariosModel.findOne({ dni: user.dni });
      if (isUserRegistered) {
        throw new Error("Vecino ya registrado");
      }
      else {
        user.password = bcrypt.hashSync(user.password, process.env.SALT);
        user.habilitado = false;
        user.claveGenerada = false;
        await UsuariosModel.create(user);
        return user;
      }
    } catch (err) {
      console.error(err);
      throw new Error("Vecino ya registrado");
    }
  }


  async generarClave(user) {
    try {

      let isUserRegistered = await UsuariosModel.findOne({ dni: user.dni });
      if (!isUserRegistered) {
        throw new Error("Vecino no registrado");
      }
      else {
        if (!isUserRegistered.claveGenerada) {
          isUserRegistered.password = bcrypt.hashSync(user.password, process.env.SALT);
          isUserRegistered.habilitado = true;
          isUserRegistered.claveGenerada = true;
          await UsuariosModel.updateOne({ dni: user.dni }, isUserRegistered);
          return user;
        }
        else {
          throw new Error("Clave ya generada");
        }
      }
    } catch (err) {
      console.error(err);
      throw Error(err);
    }
  }

  async deleteUser(userId) {
    try {
      await UsuariosModel.findOneAndDelete({ _id: userId });
    } catch (err) {
      console.error(err);
      throw new Error("Error in delete Service");
    }
  }
}

export default new UsuariosService();
