import mongoose from "mongoose";// Implements the required computed design pattern by caching precomputed reports.

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