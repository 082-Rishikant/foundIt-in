const mongoose=require('mongoose');

require('dotenv').config();

// const mongoURI = `mongodb+srv://082_Rishikant:Hansraj1999@cluster0.c8wdi.mongodb.net/test`;
const mongoURI = process.env.mongoURI;

const connectToMongo=()=>{
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true},      
).then((link) => {
  console.log("Connected to mongo successfully")
})
.catch(() => {
  console.log("Database not connected.");
})
}

module.exports=connectToMongo;