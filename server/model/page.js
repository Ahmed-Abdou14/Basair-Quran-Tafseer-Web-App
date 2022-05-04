import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pageSchema =new Schema({
    index: {
        type: Number,
        required: [true, 'Index is required'],
        min:[1,'minimum page number is 1'],
        max:[604,'maximum page number is 604']
    },
    startingSura:{
        type:Number,
        required: [true, 'starting sura is required'],
        min:[1,'minimum starting sura number is 1']
    },
    startingAya:{
        type:Number,
        required: [true, 'starting aya is required'],
        min:[1,'minimum starting aya number is 1']
    },
    endingSura:{
        type:Number,
        required: [true, 'ending sura  is required'],
        min:[1,'minimum ending sura number is 1']
    },
    endingAya:{
        type:Number,
        required: [true, 'ending aya is required'],
        min:[1,'minimum aya number is 1']
    }
})
export default mongoose.model('Page',pageSchema)
