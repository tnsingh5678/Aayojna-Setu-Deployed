import mongoose from 'mongoose';
import validator from 'validator'; // Make sure to import the validator library if you plan to use email vali
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const newUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your Name!'],
        minLength: [3, 'Name must contain at least 3 characters!'],
        maxLength: [30, 'Name cannot exceed 30 characters!'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your Email!'],
        unique: true, // Ensure the email is unique in the database
        validate: [validator.isEmail, "Please provide a valid Email!"], // Email validation using validator
    },
    phone: {
        type: String, // Change to String, to avoid potential issues with leading zeros and length
        required: [true, 'Please enter your Phone Number!'],
        minLength: [10, 'Phone number must contain at least 10 digits!'],
        maxLength: [15, 'Phone number cannot exceed 15 digits!'], // Added maxLength for phone numbers
    },
    password: {
        type: String,
        required: [true, 'Please provide a Password!'],
        minLength: [8, 'Password must contain at least 8 characters!'],
        maxLength: [32, 'Password cannot exceed 32 characters!'],
        select: false, // Do not include password in queries by default
    },
    categories: {
        type: [String], // Specify type as an array of strings, for better clarity
        required: false, // Make sure it's clear it's optional
    },
    schemes: {
        type: [String], // Specify type as an array of strings, for better clarity
        required: false, // Make sure it's clear it's optional
    },
    notification: {
        type: String,
        required: false, // Can be used for preferences or alerts, set to optional
    },
}, { timestamps: true }); // Optionally add timestamps for createdAt and updatedAt

newUserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  //COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
newUserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  //GENERATING A JWT TOKEN WHEN A USER REGISTERS OR LOGINS, IT DEPENDS ON OUR CODE THAT WHEN DO WE NEED TO GENERATE THE JWT TOKEN WHEN THE USER LOGIN OR REGISTER OR FOR BOTH. 
  newUserSchema.methods.getJWTToken = function () {
    
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      
      expiresIn: process.env.JWT_EXPIRES,
    });
  };  

const NewUser = mongoose.model('NewUser', newUserSchema);
// new

export default NewUser;
