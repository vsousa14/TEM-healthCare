import express from "express";
import UserController from "../controller/userController";

const userRoutes = express.Router();

userRoutes.get("/users", UserController.getAllUsers);
userRoutes.get("/users/:id", UserController.getUserById);
userRoutes.get("/doctors", UserController.getDoctors);
userRoutes.get("/users/:u_nome?", UserController.getUserByName);
userRoutes.post("/users", UserController.createUser);
userRoutes.put("/users/:id", UserController.updateUserById);
userRoutes.delete("/users/:id", UserController.deleteUser);
userRoutes.post("/login", UserController.loginUser);
userRoutes.post("/logout", UserController.logoutUser);

userRoutes.get("/protected-info", UserController.getProtectedInfo);

module.exports = userRoutes;
