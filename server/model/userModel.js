const mongoose = require("mongoose")

const Userschema = new mongoose.Schema({
    firstName:{
        type: String, 
        required: true
    }, 
    lastName : {
        type: String, 
        required: true
    }, 
    email : {
        type: String, 
        unique: true, 
        required: true
    }, 
    password: {
        type: String, 
        required: true
    },
    role: {
      type: String,
      enum: ['client', 'admin'],
      default: 'client',
    },
    password: {
      type: String,
      required: true,
    },
    dateCreation: {
      type: Date,
      default: Date.now,
    },
    dateModification: {
      type: Date,
    },
  }, {
    timestamps: true, // ajout automatique des champs createdAt et updatedAt
  });

  const User = mongoose.model("Users", Userschema)

  module.exports = User