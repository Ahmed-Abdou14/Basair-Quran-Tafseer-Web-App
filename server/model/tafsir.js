import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tafsirSchema = new Schema({
    index: {
        type: String, trim: true
    },
    surah: {
        type: String, trim: true
    },
    ayat: [
        {
            index: String,
            text: String
        }
    ]
})

export default mongoose.model('Tafsir', tafsirSchema)