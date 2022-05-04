import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const verseSchema = new Schema({
    id: {
        type: Number,
        required: [true, 'Surah id is a required field'],
        min: [1, 'Min ID is 1'],
        max: [114, 'Max ID is 114'],
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'Surah name is a required field']
    },
    transliteration: {
        type: String,
        trim: true,
        required: [true, 'Surah transliteration is a required field']
    },
    type: {
        type: String,
        enum: ['meccan', 'medinan'],
        required: [true, 'Surah type is a required field']
    },
    total_verses: {
        type: Number,
        min: [3, 'Min total verses is 3'],
        max: [286, 'Max total verses is 286'],
        required: [true, 'Total surah verses is a required field']
    },
    verses: [
        {
            id: Number,
            text: String
        }
    ]
})

export default mongoose.model('Verse', verseSchema)