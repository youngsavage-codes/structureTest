import { Router } from "express";
import AuthController from "../controller/auth_controller";
import { authMiddleware } from "../middlewares/auth_middleware";

const authRoute = Router();
const authController = new AuthController();

authRoute.get('/is_authenticated', authMiddleware, authController.isAuthenticatedController)
authRoute.post('/register', authController.registerController);
authRoute.post('/login', authController.loginController);
authRoute.post('/logout', authController.logoutController);
authRoute.post('/send_verify_otp', authMiddleware, authController.sendAccountVerifyOtpController);
authRoute.post('/verify_account', authMiddleware, authController.verifyAccountController);
authRoute.post('/send_reset_otp', authController.sendResetOtpController);
authRoute.post('/reset_password', authController.resetPasswordController);

export default authRoute;