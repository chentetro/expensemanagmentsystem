/**
 * Model: Cost/expense schema with category, sum, and currency.
 */

import mongoose from "mongoose";
import { ALLOWED_CURRENCIES, COST_CATEGORIES } from "../constants/enums.js";

const costSchema = new mongoose.Schema({
    userid: { type: Number, required: true },
    description: { type: String, required: true },
    category: { 
        type: String, 
        required: true, 
        enum: COST_CATEGORIES
    },
    sum: { type: Number, required: true },
    // New field added according to project requirements
    currency: { 
        type: String, 
        required: true, 
        enum: ALLOWED_CURRENCIES, // Allowed currencies according to the specification
        default: 'USD' 
    },
   
}, { timestamps: true });

export const Cost = mongoose.model("Cost", costSchema);