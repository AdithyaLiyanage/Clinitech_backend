import "dotenv/config";
import express from "express";
import cors from "cors";
import { errorHandler } from './middleware/errorHandler';
import routes from './routes/bill.routes';
import userRoutes from "./routes/UserRoutes";
import patientRoutes from "./routes/PatientRoutes";
import patientMedicalRoutes from "./routes/PatientMedicalRoutes";
import drugInventory from "./routes/drugInventoryRoutes";


const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(cors());

app.use(errorHandler);

app.use('/api/bills', routes);
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/patientsMedical", patientMedicalRoutes);
app.use("/api/drugInventory", drugInventory);

export default app;