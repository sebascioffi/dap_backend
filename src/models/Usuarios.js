import mongoose from 'mongoose';
const { Schema } = mongoose;

const UsuariosSchema = new Schema({
    name:String,
    lastname:String,
    email:String,
    password:String
});

const Usuarios = mongoose.model('Usuarios',UsuariosSchema);

export default Usuarios;