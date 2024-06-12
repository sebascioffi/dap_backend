import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReclamosMultimediaSchema = new Schema({
    idReclamo:String,
    fotos: [{
        uri : String,
        name: String
    }],
});

const ReclamosMultimedia = mongoose.model('ReclamosMultimedia',ReclamosMultimediaSchema);

export default ReclamosMultimedia;