import express from "express";
import userRoutes from "./routes/userRoutes";
import examRoutes from "./routes/examRoutes";
import medicationRoutes from "./routes/medicationRoutes";
import nutritionRoutes from "./routes/nutritionRoutes";
import objectiveRoutes from "./routes/objectiveRoutes";
import pressureRoutes from "./routes/pressureRoutes";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/prescriptions', medicationRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/objectives', objectiveRoutes);
app.use('/api/pressure', pressureRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});