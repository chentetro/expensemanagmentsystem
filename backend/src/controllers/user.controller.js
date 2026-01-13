import jwt from "jsonwebtoken"; // תצטרכי להתקין: npm install jsonwebtoken
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import logger from "../config/logger.js"; // ייבוא הלוגר

const addUser = async (req, res) => {//זה כמו SIGN UP
    const { id, first_name, last_name, email, password, birthday } = req.body;
    const url = "/api/users/add";

    try {
        // 1. ולידציה - בדיקה שכל השדות קיימים
        if (!id || !first_name || !last_name || !email || !password || !birthday) {
            logger.warn({ method: 'POST', url, status: 400, userid: id || "N/A" }, "User registration failed: missing fields");
            return res.status(400).json({ 
                id: id || "N/A", 
                message: "All fields are required" 
            });
        }

        // ולידציה נוספת
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            logger.warn({ method: 'POST', url, status: 400, userid: id }, "User registration failed: invalid ID");
            return res.status(400).json({ 
                message: "ID must be a valid number" 
            });
        }

        // 2. בדיקה אם המשתמש כבר קיים
        const existingUser = await User.findOne({ $or: [{ id }, { email }] });
        if (existingUser) {
            logger.warn({ method: 'POST', url, status: 409, userid: id }, "User registration failed: ID or email already exists");
            return res.status(409).json({ 
                message: "User already exists" 
            });
        }

        // 3. הצפנת סיסמה
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. יצירת המשתמש
        const newUser = await User.create({
            id: parsedId,
            first_name,
            last_name,
            email,
            password: hashedPassword,
            birthday
        });

        const userResponse = newUser.toObject();
        delete userResponse.password;

        // 5. תיעוד הצלחה בלוגר
        logger.info({ 
            method: 'POST', 
            url, 
            status: 201, 
            userid: id 
        }, "New user created successfully");

        return res.status(201).json(userResponse);

    } catch (error) {
        // 6. תיעוד שגיאת שרת
        logger.error({ 
            method: 'POST', 
            url, 
            status: 500, 
            userid: id || "unknown" 
        }, `Server Error during user creation: ${error.message}`);

        res.status(500).json({ 
            id: req.body.id || "server_error", 
            message: error.message 
        });
    }




};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const url = "/api/users/login";

    try {
        // 1. ולידציה בסיסית
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2. מציאת המשתמש לפי מייל
        const user = await User.findOne({ email });
        if (!user) {
            logger.warn({ method: 'POST', url, status: 404 }, `Login failed: email ${email} not found`);
            return res.status(404).json({ message: "User not found" });
        }

        // 3. אימות סיסמה
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            logger.warn({ method: 'POST', url, status: 401, userid: user.id }, "Login failed: invalid password");
            return res.status(401).json({ message: "Invalid password" });
        }

        // 4. יצירת Token (התוספת החדשה)
        // הטוקן מכיל את ה-ID של המשתמש וחתום בעזרת מפתח סודי מה-.env
        const token = jwt.sign(
            { userid: user.id }, 
            process.env.JWT_SECRET || "your_secret_key", 
            { expiresIn: "24h" }
        );

        // 5. הכנת תשובה ללא סיסמה
        const userResponse = user.toObject();
        delete userResponse.password;

        // Set the token as an httpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            domain: 'localhost'
        });

        logger.info({ method: 'POST', url, status: 200, userid: user.id }, "User logged in successfully");

        // מחזירים גם את נתוני המשתמש וגם את הטוקן
        return res.status(200).json({
            message: "Login successful",
            user: userResponse
        });

    } catch (error) {
        logger.error({ method: 'POST', url, status: 500 }, `Login error: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully" });
    logger.info({ method: 'POST', url: '/api/users/logout', status: 200, userid: req.user ? req.user.id : "N/A" }, "User logged out successfully");
};

//לבדוק עם אני צריכה את זה בכלל
const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.user.userid });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(200).json(userResponse);
        logger.info({ method: 'GET', url: '/api/users/me', status: 200, userid: req.user.userid }, "Fetched user data successfully");
    } catch (error) {
        logger.error({ method: 'GET', url: '/api/users/me', status: 500 }, `Get user error: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

export { addUser, loginUser, logoutUser, getUser };