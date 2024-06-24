import mongoose from 'mongoose';
const { Schema } = mongoose;

const DenunciasMultimediaSchema = new Schema({
    idDenuncia:String,
    fotos: [{
        uri : String,
        name: String
    }],
});

const DenunciasMultimedia = mongoose.model('DenunciasMultimedia',DenunciasMultimediaSchema);

export default DenunciasMultimedia;