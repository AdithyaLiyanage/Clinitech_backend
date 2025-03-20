import "dotenv/config";
import express from "express";
import cors from "cors";
import { errorHandler } from './middleware/errorHandler';
import routes from './routes/routes';


const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(cors());

app.use('/api', routes);

app.use(errorHandler);

// Export the app

export default app;