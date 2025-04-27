//create a routes in node js express

import express from 'express';  

import { Router } from 'express';
import contactRoutes from "./Contact.routes"
import userRoutes from "./User.routes"
import reminderRoutes from "./Reminder.routes"


const routes = Router();


routes.use("/api/v1", userRoutes)
routes.use("/api/v1", contactRoutes)
routes.use("/api/v1", reminderRoutes)

export default routes;  // Add this export statement