import Users from "./models/Users.js";
import bcrypt from "bcryptjs";
// Authorization Middleware: Check user role
export function authorizeRole(role) {
    return (req, res, next) => {
        if (req.session && req.session.user && req.session.user.role === role) {
            next(); // User has the required role, proceed
        } else {
            res.status(403).send('Forbidden.  Insufficient permissions.');
        }
    };
}

// Routes

// 1. Login Route
export const Login = async (req, res) => {
    
    const { email, password } = req.body;
    const findIt = await Users.findUserByEmail(email.toLowerCase())
    console.log(findIt)
    const compared = bcrypt.compareSync(password, findIt.password)
    if (findIt && compared) {
        // Authentication successful
        req.session.user = {
            id: findIt._id,
            email,
            role: findIt.role // Store the user's role in the session
        };
        console.log(req.session)
        res.send(`Logged in as ${email} with role ${req.session.user.role}`);
    } else {
        res.status(401).send('Login failed. Invalid credentials.');
    }
};

// 2.  Logout Route
export const Logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Could not log out.');
        } else {
            return res.status(200).send('Logged out.');
        }
    });
};