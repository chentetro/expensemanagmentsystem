/**
 * Model: Report schema with cached monthly precomputed data.
 */

import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    userid:
     { type: Number, required: true },
    year: 
    { type: Number, required: true },
    month: 
    { type: Number, required: true },
    data: 
    { type: Object, required: true } // Stores the report JSON structure
});

export const Report = mongoose.model("Report", reportSchema);