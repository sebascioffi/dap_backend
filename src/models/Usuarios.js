import mongoose from 'mongoose';
const { Schema } = mongoose;

const UsuariosSchema = new Schema({
    dni:String,
    nombre:String,
    apellido:String,
    email:String,
    password:String,
    direccion:String,
    habilitado:Boolean,
    claveGenerada:Boolean
});

const Usuarios = mongoose.model('Usuarios',UsuariosSchema);

export default Usuarios;