import mongoose from "mongoose";//כדי לממש את ה-Computed Design Pattern הנדרש, ניצור מודל שישמור דוחות שכבר חושבו כדי לחסוך זמן ריצה בעתיד.

const reportSchema = new mongoose.Schema({
    userid:
     { type: Number, required: true },
    year: 
    { type: Number, required: true },
    month: 
    { type: Number, required: true },
    data: 
    { type: Object, required: true } // כאן נשמור את מבנה ה-JSON של הדו"ח
});

export const Report = mongoose.model("Report", reportSchema);