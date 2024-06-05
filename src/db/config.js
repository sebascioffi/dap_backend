import { mongoose } from 'mongoose';
//require('dotenv').config();

export const dbConnection = async () =>{
    try{
        await mongoose.connect("mongodb+srv://nicolasmango:permisosdb@clusternmango.x1aj9xc.mongodb.net/")
        console.log('DB online!');
    }
    catch(err){
        console.error(err);
        throw new Error('Error en la conexión de la BD');
    }
};
