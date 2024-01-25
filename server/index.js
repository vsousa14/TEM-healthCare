import express from "express";
import authMiddleware from "./middleware/authMiddleware";
import userRoutes from "./routes/userRoutes";
import examRoutes from "./routes/examRoutes";
import medicationRoutes from "./routes/medicationRoutes";
import nutritionRoutes from "./routes/nutritionRoutes";
import objectiveRoutes from "./routes/objectiveRoutes";
import pressureRoutes from "./routes/pressureRoutes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/exams", authMiddleware, examRoutes);
app.use("/api/prescriptions", authMiddleware, medicationRoutes);
app.use("/api/nutrition", authMiddleware, nutritionRoutes);
app.use("/api/objectives", authMiddleware, objectiveRoutes);
app.use("/api/pressure", authMiddleware, pressureRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
