const mongoose = require('mongoose');
const Question = require('./models/searchModel');
const data = require('./data.json');

require('dotenv').config();

const convertObjectId = (obj) => {
    if (obj && typeof obj === 'object'){
        for( const key in obj){
            if(obj[key] && typeof obj[key] === 'object'){
                if(obj[key].$oid){
                    obj[key] = new mongoose.Types.ObjectId(obj[key].$oid);
                }else{
                    convertObjectId(obj[key]);
                }
            }
        }
    }
}

data.forEach(convertObjectId);


mongoose.connect(process.env.MONGODB_URI
).then(async() => {
    console.log('Connected to MongoDB');

    await Question.deleteMany({});
    console.log('Data deleted successfully');

    await Question.insertMany(data);
    console.log('Data loaded successfully');

    mongoose.disconnect();
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});
