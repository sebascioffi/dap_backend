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
        user.habilitado = false;
        await UsuariosModel.create(user);
        return user;
      }
    } catch (err) {
      console.error(err);
      throw new Error("Error in solicitudClave Service");
    }
  }
  async generarClave(user) {
    try {

      let isUserRegistered = await UsuariosModel.findOne({ dni: user.dni });
      if (!isUserRegistered) {
        throw new Error("Vecino no registrado");
      }
      else {
        isUserRegistered.password = bcrypt.hashSync(user.password, process.env.SALT);
        await UsuariosModel.updateOne({dni : user.dni} , isUserRegistered);
        //await UsuariosModel.create(user);
        return user;
      }
    } catch (err) {
      console.error(err);
      throw new Error("Error en generarClave Service");
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
