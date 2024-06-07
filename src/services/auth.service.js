import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import UsuariosModel from "../models/Usuarios.js";


class AuthService {
  async hasValidCredentials(dni, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, process.env.SALT);
      const user = await UsuariosModel.findOne({ dni });
      console.log("user" + user);
      if (user && hashedPassword === user.password) {
        return true;
      }
      
      return false;
    } catch (err) {
      console.error(err);
      throw new Error("Error in credentials validation");
    }
  }
}

export default new AuthService();
