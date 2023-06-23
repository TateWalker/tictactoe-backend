"use strict";
// import db from "../models";
// import { UserAttributes } from "../models/user";
// import { CognitoService } from "./cognitoService";
// import { UserSignUpBody } from "../models/types/user/UserSignUpBody";
// import { UserUpdateBody } from "../models/types/user/UserUpdateBody";
// import { ResponseMessages } from "../models/ResponseMessagesEnum";
// import { VerifyAttributeBody } from "../models/types/user/VerifyAttributeBody";
// const { Op } = require("sequelize");
// const User = require("../models/user")(db.sequelize, db.Sequelize.DataTypes);
// export class UserService {
//   CognitoService = new CognitoService();
//   public async createUser(user: UserSignUpBody): Promise<any> {
//     const newUser = {
//       first_name: user.first_name,
//       last_name: user.last_name,
//       email: user.email,
//       validated: user.validated,
//     };
//     const cognitoResponse = await this.CognitoService.signUpUser(user);
//     if (cognitoResponse) {
//       const dbUser = await User.create(newUser);
//       return {
//         status: 200,
//         user: dbUser,
//       };
//     }
//     return { status: 500 };
//   }
//   public async verifyUserEmail(verifyAttributeBody: VerifyAttributeBody) {
//     try {
//       const cognitoResult = await this.CognitoService.verifyUserEmail(
//         verifyAttributeBody
//       );
//       const user = {
//         email: verifyAttributeBody.username,
//         validated: true,
//       };
//       await User.update(user, {
//         where: {
//           email: user.email,
//         },
//         returning: true,
//         plain: true,
//       });
//       return cognitoResult;
//     } catch (error: any) {
//       throw error;
//     }
//   }
//   public async getUserById(id: string): Promise<UserAttributes> {
//     try {
//       const resp = await User.findByPk(id);
//       if (typeof resp !== "undefined" && resp !== null) {
//         return resp;
//       } else {
//         throw new Error(`User ${id} not found`);
//       }
//     } catch (error: any) {
//       console.error(error.name);
//       throw error;
//     }
//   }
//   public static async getUserByEmail(email: string): Promise<UserAttributes> {
//     try {
//       const resp = await User.findOne({
//         where: { email: email },
//       });
//       if (typeof resp !== "undefined" && resp !== null) {
//         return resp;
//       } else {
//         throw new Error(`No user found with email: ${email}`);
//       }
//     } catch (error: any) {
//       console.error(error.name);
//       throw { status: 500, message: ResponseMessages.USER_NOT_FOUND };
//     }
//   }
//   public async listUsers(startdate?: string, enddate?: string): Promise<any> {
//     let where;
//     try {
//       if (startdate && startdate !== "" && enddate && enddate !== "") {
//         console.log("start and end date");
//         where = {
//           createdAt: {
//             [Op.lte]: new Date(enddate),
//             [Op.gte]: new Date(startdate),
//           },
//         };
//       } else if (startdate && startdate !== "") {
//         console.log("start date");
//         where = {
//           createdAt: {
//             [Op.gte]: new Date(startdate),
//           },
//         };
//       } else if (enddate && enddate !== "") {
//         console.log("end date");
//         where = {
//           createdAt: {
//             [Op.lte]: new Date(enddate),
//           },
//         };
//       }
//       console.log("where statement ", where);
//       const result = await User.findAll({
//         where: where,
//         raw: true,
//         order: [["createdAt", "DESC"]],
//       });
//       return {
//         status: 200,
//         data: result,
//       };
//     } catch (error: any) {
//       console.error(error.name);
//       throw error;
//     }
//   }
//   public async updateUser(user: Partial<UserUpdateBody>) {
//     try {
//       const result = await User.update(user, {
//         where: {
//           id: user.id,
//         },
//         returning: true,
//         plain: true,
//       });
//       return {
//         status: 200,
//         user: result[1].dataValues,
//       };
//     } catch (error: any) {
//       console.error(error.name);
//       throw { status: 500, message: error.name };
//     }
//   }
//   public async deleteUser(userId: string) {
//     try {
//       const deletedRows = await User.destroy({
//         where: {
//           id: userId,
//         },
//       });
//       if (deletedRows === 0) {
//         throw new Error();
//       }
//     } catch (error) {
//       console.error(error);
//       throw { status: 500, message: ResponseMessages.USER_NOT_FOUND };
//     }
//   }
// }
