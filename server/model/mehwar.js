import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mehwarSchema = new Schema({
    surahID:{
        type: Number,
        required: [true, 'Surah id is a required field'],
        min: [1, 'Min Surah number is 1'],
        max: [114, 'Max Surah number is 114']
    },
    moqadema:{
        title:{type:String,required: [true,'title is required'],trim:true},
        range:{type:String,required: [true,'range is required'],trim:true},
        sections: [
            {
                id:{type:Number,required: [true,'section id is required']},
                text:{type:String,required: [true,'text is required'],trim:true},
                startAya:{type:Number,required: [true,'start aya is required']},
                endAya:{type:Number,required: [true,'end aya is required']}
            }
        ],
    },
    mahawer: [
        {
            id:{type:Number,required:[true,'mehwar ID is required']},
            counter:{type:String,required: [true,'mehwar counter is required'],trim:true},
            title:{type:String,required: [true,'mehwar title is required'],trim:true},
            text:{type:String,required: [true,'mehwar text is required'],trim:true},
            range:{type:String,required: [true,'mehwar range is required'],trim:true},
            sections: [
                {
                    id:{type:Number,required: [true,'section id is required']},
                    text:{type:String,required: [true,'text is required'],trim:true},
                    startAya:{type:Number,required: [true,'start aya is required']},
                    endAya:{type:Number,required: [true,'end aya is required']}
                }
            ],
        }
    ]

})

export default mongoose.model('Mehwar', mehwarSchema)