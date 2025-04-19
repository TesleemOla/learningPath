import express from "express";
import pkg  from "express-session";
import bcrypt from "bcrypt"
import Connect from "./db.js";
import { createUser } from "./controllers/Users.js";
import morgan from "morgan"
import { GoogleGenerativeAI } from '@google/generative-ai'
import userrouter from "./routes/users.js";


const app = express();
app.use(express.json({ urlencoded: true }));
const PORT = process.env.PORT || 8000;
const session  = pkg;


// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// In-memory user store (replace with DB in production)


// Middleware

app.use(morgan("tiny"))

Connect()

app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true with HTTPS
}));

// Auth middleware
function isAuthenticated(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

// error middleware

app.use((err, req, res, next) => {
  console.error(`${err.name}: ${err.message}`);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      message: err.message,
      code: statusCode,
    },
  });
});
// Routes

// Register
app.post('/register', createUser);

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = User.find({username});
  if (!user) return res.status(400).json({ message: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  req.session.username = username;
  res.json({ message: 'Login successful' });
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
});

app.use(userrouter)
// Protected route: Generate learning path
app.post('/generate-path', async (req, res) => {
  let { language } = req.body;
  if (!language) language = "Javascript" 
    // return res.status(400).json({ message: 'Language is required' });

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Create a personalized 4-week beginner-to-advanced learning path for someone wanting to learn ${language}. Include weekly goals and key topics.
    Write this in a clear and consise Javascript Object or Array format`;

    const result = await model.generateContent(prompt);
    console.log(result)
    const content = result.response.text();

    res.json({ path: content });
  } catch (error) {
    console.error('Gemini Error:', error);
    res.status(500).json({ message: 'Failed to generate path' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
