const mongoose=require('mongoose');

require('dotenv').config();

const mongoURI = process.env.URI;

const connectToMongo=()=>{
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true},      
).then((link) => {
  console.log("Connected to mongo successfully")
})
.catch((e) => {
  console.log(e);
  console.log("Database not connected.");
})
}

module.exports=connectToMongo;