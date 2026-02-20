import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    // 'info' for successful operations and 'error' for failures; useful for filtering in Compass.
    level: { type: String, default: 'info' }, 
    
    // Short action description (for example: "Fetching monthly report").
    message: { type: String, required: true },
    
    // Helps identify request method type (GET/POST).
    method: { type: String },
    
    // Exact endpoint URL, useful for identifying high-traffic routes.
    url: { type: String },
    
    // Critical for quickly comparing successes (200/201) vs failures (400/500).
    status: { type: Number },
    
    // Associates the log with a specific user for troubleshooting and audit tracking.
    userid: { type: Number }, 
    
    // Auto-generated timestamp for chronological sorting.
    timestamp: { type: Date, default: Date.now }
});

export const Log = mongoose.model("Log", logSchema);