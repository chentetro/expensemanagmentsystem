import mongoose from "mongoose";//כאן עלינו להקפיד על הקטגוריות הספציפיות שהוגדרו: אוכל, בריאות, דיור, ספורט וחינוך.
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
    // השדה החדש שהוספנו לפי דרישות הפרויקט
    currency: { 
        type: String, 
        required: true, 
        enum: ALLOWED_CURRENCIES, // המטבעות המותרים לפי המסמך
        default: 'USD' 
    },
   
}, { timestamps: true });

export const Cost = mongoose.model("Cost", costSchema);