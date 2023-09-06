import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { taskRoute } from "./routes/tasksRoute.js";
import { displayTaskRouter } from "./routes/displayTaskRoute.js";
import { deleteRouter } from "./routes/deleteTask.js";
import { updateRouter } from "./routes/updateTask.js";
import { registerRoute } from "./routes/registerUser.js";

const app=express();
app.use(cors());
mongoose.connect("mongodb+srv://aravind:aravind@quicknote.17et4ly.mongodb.net/quicknotes");
app.use(express.json());
app.use('/',taskRoute)
app.use('/',displayTaskRouter)
app.use('/',deleteRouter);
app.use('/',updateRouter);
app.use('/',registerRoute);
const PORT=3001;
app.listen(PORT,()=>{
    console.log("server is up");
})