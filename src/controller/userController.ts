// import {
//   Body,
//   Controller,
//   Get,
//   Header,
//   Path,
//   Post,
//   Put,
//   Delete,
//   Route,
//   Query,
// } from "tsoa";
// import { UserService } from "../service/userService";
// import { UserAttributes } from "../models/user";
// import { UserSignUpBody } from "../models/types/user/UserSignUpBody";
// import { VerifyAttributeBody } from "../models/types/user/VerifyAttributeBody";
// import { CognitoService } from "../service/cognitoService";
// import { LoginBody } from "../models/types/user/LoginBody";
// import { ChangePasswordBody } from "../models/types/user/ChangePasswordBody";
// import { ForgotPasswordBody } from "../models/types/user/ForgotPasswordBody";
// import { UnauthenticatedUserBody } from "../models/types/user/UnauthenticatedUserBody";
// import { ChangeAttributeBody } from "../models/types/user/ChangeAttributeBody";
// import { UserUpdateBody } from "../models/types/user/UserUpdateBody";

// // localhost:3000/user
// @Route("user")
// export class UserController extends Controller {
//   UserService = new UserService();
//   CognitoService = new CognitoService();

//   @Get("{id}")
//   public async getUser(@Path() id: string): Promise<any> {
//     return this.UserService.getUserById(id);
//   }

//   @Get("/email/{email}")
//   public async getUserByPhone(@Path() email: string): Promise<any> {
//     try {
//       return UserService.getUserByEmail(email);
//     } catch (err: any) {
//       this.setStatus(err.status);
//       return err;
//     }
//   }

//   @Get("")
//   public async listUsers(
//     @Query() startdate?: string,
//     @Query() enddate?: string
//   ): Promise<UserAttributes[]> {
//     return await this.UserService.listUsers(startdate, enddate);
//   }

//   @Post("")
//   public async saveUser(@Body() user: UserSignUpBody) {
//     try {
//       return await this.UserService.createUser(user);
//     } catch (err: any) {
//       this.setStatus(err.status);
//       return err;
//     }
//   }

//   @Post("change-attribute")
//   public async changeAttribute(
//     @Header("Cognito") tokens: any,
//     @Body() body: ChangeAttributeBody
//   ) {
//     try {
//       return await this.CognitoService.changeUserAttribute(tokens, body);
//     } catch (err: any) {
//       this.setStatus(err.status);
//       return err;
//     }
//   }

//   @Post("validate-email")
//   public async validateSms(@Body() body: VerifyAttributeBody) {
//     try {
//       return await this.UserService.verifyUserEmail(body);
//     } catch (err: any) {
//       this.setStatus(err.status);
//       return err;
//     }
//   }

//   @Post("resend-sms")
//   public async resendSms(@Body() body: UnauthenticatedUserBody) {
//     try {
//       return await this.CognitoService.resendSms(body);
//     } catch (err: any) {
//       this.setStatus(err.status);
//       return err;
//     }
//   }

//   @Post("get-email-code")
//   public async getEmailCode(@Body() body: LoginBody) {
//     try {
//       return await this.CognitoService.getEmailValidationCode(body);
//     } catch (err: any) {
//       this.setStatus(err.status);
//       return err;
//     }
//   }

//   @Post("login")
//   public async login(@Body() body: LoginBody) {
//     try {
//       return await this.CognitoService.signInUser(body);
//     } catch (err: any) {
//       this.setStatus(err.status);
//       return err;
//     }
//   }

//   @Post("reset-password")
//   public async resetPassword(
//     @Body() body: ChangePasswordBody,
//     @Header("Cognito") tokens: string
//   ) {
//     try {
//       return await this.CognitoService.changePassword(tokens, body);
//     } catch (err: any) {
//       this.setStatus(err.status);
//       return err;
//     }
//   }

//   @Post("start-forgot-password")
//   public async startForgotPassword(@Body() body: UnauthenticatedUserBody) {
//     try {
//       return await this.CognitoService.startForgotPassword(body);
//     } catch (err: any) {
//       this.setStatus(err.status);
//       return err;
//     }
//   }

//   @Post("complete-forgot-password")
//   public async completeForgotPassword(@Body() body: ForgotPasswordBody) {
//     try {
//       return await this.CognitoService.completeForgotPassword(body);
//     } catch (err: any) {
//       this.setStatus(err.status);
//       return err;
//     }
//   }

//   @Post("sign-out")
//   public async signOut(
//     @Header("Cognito") tokens: string,
//     @Body() body: UnauthenticatedUserBody
//   ) {
//     try {
//       return await this.CognitoService.signOutUser(tokens, body);
//     } catch (err: any) {
//       this.setStatus(err.status);
//       return err;
//     }
//   }

//   @Post("validate-token")
//   public async validateToken(
//     @Header("access") accessToken: string
//   ): Promise<boolean> {
//     try {
//       const payload = await this.CognitoService.validateToken(accessToken);
//       return payload;
//     } catch (err: any) {
//       return false;
//     }
//   }

//   @Put("")
//   public async updateUser(@Body() user: Partial<UserUpdateBody>) {
//     try {
//       return await this.UserService.updateUser(user);
//     } catch (err: any) {
//       this.setStatus(err.status);
//       return err;
//     }
//   }

//   @Delete("{id}")
//   public async deleteUser(@Path() id: string) {
//     await this.UserService.deleteUser(id);
//     return {
//       status: "User deleted",
//     };
//   }
// }
