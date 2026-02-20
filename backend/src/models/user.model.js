/**
 * Model: User schema for authentication (email, password, profile fields).
 */

import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    first_name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        minLength:1,
        maxLength:10
    },
    last_name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        minLength:1,
        maxLength:10
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        minLength:5,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
    },
    birthday:{
        type:Date,
        required:true
    },
},

    {
        timestamps:true

    });

export const User = mongoose.model("User", userSchema);

