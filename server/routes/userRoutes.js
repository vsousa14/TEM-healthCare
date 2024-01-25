import express from "express";
import UserController from "../controller/userController";
import authMiddleware, { jwtKEY } from "../middleware/authMiddleware";

const userRoutes = express.Router();

userRoutes.get("/users", authMiddleware, UserController.getAllUsers);
userRoutes.get("/users/:u_id", authMiddleware, UserController.getUserById);
userRoutes.get("/doctors", authMiddleware, UserController.getDoctors);
userRoutes.get("/users/:u_nome?", authMiddleware, UserController.getUserByName);
userRoutes.post("/users", authMiddleware, UserController.createUser);
userRoutes.put("/users/:u_id", authMiddleware, UserController.updateUserById);
userRoutes.delete("/users/:u_id", authMiddleware, UserController.deleteUser);
userRoutes.post("/login", UserController.loginUser);
userRoutes.post("/logout", authMiddleware, UserController.logoutUser);

userRoutes.get(
  "/protected-info",
  authMiddleware,
  UserController.getProtectedInfo
);

module.exports = userRoutes;
