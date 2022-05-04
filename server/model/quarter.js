import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const quarterSchema =new Schema({
    index: {
        type: Number,
        required: [true, 'Index is required'],
        min:[1,'minimum quarter number is 1'],
        max:[240,'maximum quarter number is 240']
    },
    sura:{
        type:Number,
        required: [true, 'sura is required'],
        min:[1,'minimum starting sura is 1']
    },
    aya:{
        type:Number,
        required: [true, 'aya is required'],
        min:[1,'minimum starting aya number is 1']
    }
})
export default mongoose.model('Quarter',quarterSchema)
