import cors from "cors"

app.use(cors({
    origin: ['http://localhost:3000',"http://localhost:5173"],
    credentials: true
}));
