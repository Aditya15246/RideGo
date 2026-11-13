const { Router } = require("express");
const AuthMiddle = require('../middleware/auth.middleware.js')

const authController = require("../controllers/authController.js");

const authRouter = Router();

/* POST /api/auth/register */
authRouter.post("/register", authController.register);

/* POST /api/auth/login */
authRouter.post("/login", authController.login);

/* GET /api/auth/get-me */
authRouter.get("/get-me", AuthMiddle,authController.getMe);

module.exports = authRouter;
