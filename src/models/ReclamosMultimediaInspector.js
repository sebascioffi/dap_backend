import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReclamosMultimediaInspectorSchema = new Schema({
    idReclamo:String,
    fotos: [{
        uri : String,
        name: String
    }],
});

const ReclamosMultimediaInspector = mongoose.model('ReclamosMultimediaInspector',ReclamosMultimediaInspectorSchema);

export default ReclamosMultimediaInspector;