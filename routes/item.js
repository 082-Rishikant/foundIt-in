const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const Item = require('../models/Item');
const User = require('../models/User');
const fetchuser = require('../middlewares/fetchuser');

// cloudinary***********
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.API_SECRET_KEY
});

// Router- 1 ADD an Item using POST:'/api/item/uploaditem' | login required**********
router.post('/uploaditem',
  fetchuser,
  [
    // validation rules for input
    body('name', 'Enter a valid item name').isLength({ min: 2 }),
    body('place', 'Enter a valid item name').isLength({ min: 2 }),
    body('type', 'Enter a valid item type').isLength({ min: 2 }),
    body('status', 'Enter a valid status').isLength({ min: 4 })
  ],
  (req, res) => {
    try {
      //check for validaion errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(502).json({ success: false, message: "Some errors in creds validation", errors: errors.array() });
      }

      const file = req.files.image;
      cloudinary.uploader.upload('/tmp', (err, result) => {
        if (result) {
          // create an new item using Item model
          let date = new Date();
          if (req.body.date) {
            date = new Date(req.body.date);
          }
          const item = new Item({
            user: req.user_id,
            name: req.body.name,
            type: req.body.type,
            date: date,
            place: req.body.place,
            description: req.body.description,
            image_name: result.url,
            public_id: result.public_id,
            user_name: req.body.user_name,
            status: req.body.status
          });
          // Now save the item to mongodb
          item.save().then(savedItem => { res.send({ success: true, savedItem }); });
        } else {
          return res.status(503).send({ success: false, message:err});
        }
      });
    } catch (error) {
      return res.status(503).send({ success: false, from: "Catch section", message: error.message });
    }
  });


// Router 2) - fetch all Items of a user using GET:'/api/item/fetchitems' | login required
router.get('/fetchitems',
  fetchuser,
  async (req, res, next) => {
    try {
      // fetch all items of current user from DB with the help of user_id
      const user_id = req.user_id;
      let items_list = await Item.find({ user: user_id });
      res.json({ success: true, items_list });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  });

// Router 3: Delete an existing Item using:DELETE   '/api/item/deleteItem:id'   Login required;
router.delete('/deleteItem/:id/:public_id', fetchuser, async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    if (item.user.toString() !== req.user_id) {
      return res.status(401).send({ success: false, message: "sorry!! You are not allowed to delete this item" });
    }
    // Finaly deleting Image**
    await cloudinary.uploader.destroy(req.params.public_id);
    // finaly Deleting item**
    item = await Item.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Item deleted successfully", item: item });
  } catch (error) {
    console.error(error.message);
    res.status(402).send({ success: false, message: error.message, from: "deleteItem | catch" });
  }
})

// Router 4: Update an existing Item using:PUT   '/api/item/updateItem/:id'   Login required;
router.put('/updateItem/:id/:public_id',
  fetchuser, [
  body('name', 'Enter a valid item name').isLength({ min: 2 }),
  body('place', 'Enter a valid item name').isLength({ min: 2 })
],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(502).json({ success: false, from: "creds validation", message: errors.array() });

      // checking whether user owns this Item or not
      let item=await Item.findById(req.params.id);
      if (item.user.toString() !== req.user_id) return res.status(401).send({ success: false, message: "You are not allowed to update this Item" });
        
      const { name, type, place, date, description } = req.body;
      const file = req.files.image;
      cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        if (result) {
          // Making a item that will replace old existing item
          const newItem = {};
          newItem.image_name = result.url;
          newItem.public_id = result.public_id;
          if (name) newItem.name = name;  
          if (type) newItem.type = type;  
          if (place) newItem.place = place;
          if (date) newItem.date = date;  else newItem.date = Date.now;
          if (description) newItem.description = description; 

          // Finaly deleting Image**
          await cloudinary.uploader.destroy(req.params.public_id);
          item = await Item.findByIdAndUpdate(req.params.id, { $set: newItem }, { new: true })
          res.json({ success: true, item });
        }
        else  console.log("Can not upload Item || UpdateItem");
      });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message, from: "Catch section" });
    }
  })

// Router 5: getAllItems || Login required
router.get('/getAllItems', fetchuser, async (req, res) => {
  try {
    const allitems = await Item.find();
    res.send({ success: true, allitems: allitems });
  } catch (error) {
    res.status(402).send({ success: false, message: error.message, from: "getAllItems" });
  }
})

// Router 6: getAItem || Login required
router.get('/getAItem/:id', fetchuser, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.send({ success: true, item: item });
  } catch (error) {
    res.status(402).send({ success: false, message: error.message, from: "getAItem" });
  }
})


module.exports = router;