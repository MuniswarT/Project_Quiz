const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    console.log(" Request Headers:", req.headers); // Debugging

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log(" Extracted Token:", token);

            // Verify JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(" Decoded Token:", decoded);

            // Find user by ID and attach to `req.user`
            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = user; //  FIX: Ensure `req.user` is set correctly
            next();
        } catch (error) {
            console.error(" JWT Verification Error:", error.message);
            return res.status(401).json({ message: "Not authorized, invalid token" });
        }
    } else {
        console.log(" No Authorization header");
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = { protect };
