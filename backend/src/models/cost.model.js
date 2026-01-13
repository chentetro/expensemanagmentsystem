import mongoose from "mongoose";//כאן עלינו להקפיד על הקטגוריות הספציפיות שהוגדרו: אוכל, בריאות, דיור, ספורט וחינוך.

const costSchema = new mongoose.Schema({
    userid: { type: Number, required: true },
    description: { type: String, required: true },
    category: { 
        type: String, 
        required: true, 
        enum: ['food', 'health', 'housing', 'sports', 'education'] 
    },
    sum: { type: Number, required: true },
    // השדה החדש שהוספנו לפי דרישות הפרויקט
    currency: { 
        type: String, 
        required: true, 
        enum: ['USD', 'ILS', 'GBP', 'EURO'], // המטבעות המותרים לפי המסמך
        default: 'USD' 
    },
   
}, { timestamps: true });

export const Cost = mongoose.model("Cost", costSchema);