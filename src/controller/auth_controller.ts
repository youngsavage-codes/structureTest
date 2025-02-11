import { Request, Response } from "express";
import { 
    registerLogic, 
    loginLogic, 
    logoutLogic, 
    verifyAccountLogic, 
    sendResetOtpLogic, 
    sendVerifyOtpLogic, 
    resetPasswordLogic, 
    isAuthenticatedLogic } from "../logics/auth_logic"; 

class AuthController {
 registerController = async (request: Request, response: Response) => {
    try {
        return await registerLogic(request, response);
    } catch(error) {

    }
 }

 loginController = async (request: Request, response: Response) => {
    try {
        return await loginLogic(request, response);
    } catch(error) {

    }
 }

 logoutController = async (request: Request, response: Response) => {
    try {
        return await logoutLogic(request, response);
    } catch(error) {

    }
 }

 isAuthenticatedController = async (request: Request, response: Response) => {
    try {
        return await isAuthenticatedLogic(request, response);
    } catch(error) {

    }
 }

 verifyAccountController = async (request: Request, response: Response) => {
    try {
        return await verifyAccountLogic(request, response);
    } catch(error) {

    }
 }

 sendAccountVerifyOtpController = async (request: Request, response: Response) => {
    try {
        return await sendVerifyOtpLogic(request, response);
    } catch(error) {

    }
 }

 sendResetOtpController = async (request: Request, response: Response) => {
    try {
        return await sendResetOtpLogic(request, response);
    } catch(error) {

    }
 }

 resetPasswordController = async (request: Request, response: Response) => {
    try {
        return await resetPasswordLogic(request, response);
    } catch(error) {

    }
 }
}

export default AuthController