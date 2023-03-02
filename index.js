const express = require('express');
const connectToMongo=require('./db');
const cors=require('cors');
const fileupload=require('express-fileupload');
const path = require("path");
// Port Number using environmental variables
require('dotenv').config();

const app = express();

// Step-2 Heroku*******
const port=process.env.PORT;

connectToMongo();

// for uploading file
app.use(fileupload());

app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/item', require('./routes/item'));
app.use("/item-img", express.static(__dirname+'/public/item_images'));
app.use("/user-img", express.static(__dirname+'/public/user_images'));

// step 3: Heroku 
if ( process.env.NODE_ENV === "production"){
  // app.use(express.static("foundit-frontend/build"));
  app.use(express.static(path.join(__dirname, "./foundit-frontend/build")));
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'foundit-frontend', 'build', 'index.html'));
  })
}

app.listen(port, ()=>{
  console.log(`App is running on the port ${port}`);
})