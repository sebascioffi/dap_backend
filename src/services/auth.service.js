import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import UsuariosModel from "../models/Usuarios.js";


class AuthService {
  async hasValidCredentials(dni, password) {
    const user = await UsuariosModel.findOne({ dni });
    if (!user) {
      return { found: false, validPassword: false };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    return { found: true, validPassword: isValidPassword };
  }
}

export default new AuthService();
