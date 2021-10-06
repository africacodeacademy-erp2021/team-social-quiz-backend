const mongoose = require('mongoose')

const dburl = "mongodb://localhost:27017/aca_tsq"

const InitiateMongoServer = async () =>{
    try{
        await mongoose.connect(dburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });

        console.log("Connected to DB")

    }catch (e){
        console.log("Error: ",e)
        throw e
    }
};

module.exports = InitiateMongoServer;



