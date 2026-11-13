const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const driverController = require("../controllers/driverController");


const driveRouter = Router()

driveRouter.post("/profile",authMiddleware,roleMiddleware("driver"),driverController.createDriverProfile)
driveRouter.get("/profile",authMiddleware,roleMiddleware("driver"),driverController.getDriverProfile)
driverRouter.patch("/profile",authMiddleware,roleMiddleware("driver"),driverController.updateDriverProfile)
