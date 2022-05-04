import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const surahSchema = new Schema({
    id: {
        type: Number,
        required: [true, 'Surah id is a required field'],
        min: [1, 'Min ID is 1'],
        max: [114, 'Max ID is 114']
    },
    name: {
        type: String, required: [true, 'Surah name is a required field'], trim: true
    },
    englishName: {
        type: String, required: [true, 'English surah name is a required field'], trim: true
    },
    ayaCount: {
        type: Number,
        required: [true, 'Aya count is a required field'],
        min: [3, 'Min aya count is 3'],
        max: [286, 'Max aya count is 286'],
    },
    type: {
        type: String, required: [true, 'Surah type is a required field'], enum: ['Meccan', 'Medinan']
    },
    juz: {
        type: Number,
        required: [true, 'Juz number is a required field'],
        min: [1, 'Min juz number is 1'],
        max: [30, 'Max juz number is 30'],
    }
})

export default mongoose.model('Surah', surahSchema)