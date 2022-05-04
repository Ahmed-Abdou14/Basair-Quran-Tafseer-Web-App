import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const juzSchema =new Schema({
    index: {
        type: Number,
        required: [true, 'Juz index is required'],
        min:[1,'minimum juz index is 1'],
        max:[30,'maximum juz index is 30']
    },
    sura:{
        type:Number,
        required: [true, 'sura is required'],
        min:[1,'minimum sura number is 1'],
        max:[78,'maximum sura number is 78']
    },
    aya:{
        type:Number,
        required: [true, 'aya is required'],
        min:[1,'minimum sura aya number is 1'],
        max:[253,'maximum sura aya number is 253']
    },
    name:{
        arabic:{type:String, required:true},
        english:{type:String, required:true}
    }
})

export default mongoose.model('Juz',juzSchema);
