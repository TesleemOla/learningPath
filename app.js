import express from "express";
import pkg  from "express-session";
import Connect from "./db.js";
import { createUser } from "./controllers/Users.js";
import morgan from "morgan"
import { GoogleGenerativeAI } from '@google/generative-ai'
import userrouter from "./routes/users.js";
import { prompt } from "./prompt.js";
import { parseAIResponse } from "./utils/formatter.js";


const app = express();
app.use(express.json({ urlencoded: true }));
const PORT = process.env.PORT || 8000;
const session  = pkg;


// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



// Middleware

app.use(morgan("tiny"))

Connect()

app.use(session({
  secret: 'process.env.SESSION_SECRET',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  maxAge: 5*60*60 
}));

// Auth middleware
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    console.log(req.session.user)
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

// Routes

// Register
app.post('/register', createUser);


app.use(userrouter)
// Protected route: Generate learning path
app.post('/generate-path/:language', isAuthenticated, async(req, res) => {
  const { language } = req.params
  console.log(req.params)
  if (!language){
    return res.status(400).json({ message: 'Language is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });


    const result = await model.generateContent(prompt(language, "expertise", "Beginner", "4 weeks"));
    console.log(result.response)
    const content  = result.response.text()
    // const content = parseAIResponse(result.response.text());
    
    // res.json(content);
    return res.status(200).json(content)
  } catch (error) {
    console.error('Gemini Error:', error);
    res.status(500).json({ message: 'Failed to generate path' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
