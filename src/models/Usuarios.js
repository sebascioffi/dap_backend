import mongoose from 'mongoose';
const { Schema } = mongoose;

const UsuariosSchema = new Schema({
    dni:String,
    nombre:String,
    apellido:String,
    email:String,
    password:String,
    habilitado:Boolean
});

const Usuarios = mongoose.model('Usuarios',UsuariosSchema);

export default Usuarios;