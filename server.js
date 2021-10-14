const mongoose = require('mongoose')
const db_url = "mongodb://localhost:27017/tsq_quiz"

const initiateServer = async ()=>{
try{

    await mongoose.connect(db_url, {
        userNewUrlParser: true
    });

    console.log("Connected to DB")

}catch(e){
    console.log("Error", e)
    throw e
}
}

module.exports = initiateServer