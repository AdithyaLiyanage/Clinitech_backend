import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes";
import patientRoutes from "./routes/PatientRoutes";
import patientMedicalRoutes from "./routes/PatientMedicalRoutes";


const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(cors());

// Simple route for the root URL
app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/patientsMedical", patientMedicalRoutes);

export default app;