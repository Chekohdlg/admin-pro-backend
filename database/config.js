const mongoose = require('mongoose');

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
           // useCreateIndex:true
        });    
        console.log('db online');
    } catch (error) {
        console.error(error);
        throw new Error("Error al conectar a la db");
    }
    
}

module.exports ={
    dbConnection
}