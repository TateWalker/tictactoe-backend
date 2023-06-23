"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoService = void 0;
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
const ResponseMessagesEnum_1 = require("../models/ResponseMessagesEnum");
const userService_1 = require("./userService");
require("dotenv/config");
const aws_jwt_verify_1 = require("aws-jwt-verify");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const poolData = {
    UserPoolId: config.cognitoUserPoolId,
    ClientId: config.cognitoClientId,
};
class CognitoService {
    createCognitoUser(username) {
        var userPool = new amazon_cognito_identity_js_1.CognitoUserPool(poolData);
        var userData = {
            Username: username,
            Pool: userPool,
        };
        return new amazon_cognito_identity_js_1.CognitoUser(userData);
    }
    createCognitoSession(tokens) {
        const sessionData = {
            IdToken: new amazon_cognito_identity_js_1.CognitoIdToken({ IdToken: tokens.idToken }),
            AccessToken: new amazon_cognito_identity_js_1.CognitoAccessToken({ AccessToken: tokens.accessToken }),
            RefreshToken: new amazon_cognito_identity_js_1.CognitoRefreshToken({
                RefreshToken: tokens.refreshToken,
            }),
        };
        return new amazon_cognito_identity_js_1.CognitoUserSession(sessionData);
    }
    signUpUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let userPool = new amazon_cognito_identity_js_1.CognitoUserPool(poolData);
            let attributeList = [];
            attributeList.push(new amazon_cognito_identity_js_1.CognitoUserAttribute({
                Name: "email",
                Value: body.email,
            }));
            return yield new Promise(function (resolve, reject) {
                userPool.signUp(body.email, body.password, attributeList, 
                // @ts-ignore
                null, function (err, result) {
                    if (err) {
                        console.log("Failed to create user");
                        reject({ status: 500, error: err });
                    }
                    console.log("result", result);
                    resolve(result);
                });
            });
        });
    }
    getEmailValidationCode(body) {
        return __awaiter(this, void 0, void 0, function* () {
            var authenticationDetails = new amazon_cognito_identity_js_1.AuthenticationDetails({
                Username: body.username,
                Password: body.password,
            });
            var cognitoUser = this.createCognitoUser(body.username);
            return yield new Promise(function (resolve, reject) {
                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: function (authenticateResult) {
                        cognitoUser.getAttributeVerificationCode("email", {
                            onSuccess: () => {
                                resolve({
                                    status: 200,
                                    accessToken: authenticateResult.getAccessToken().getJwtToken(),
                                    idToken: authenticateResult.getIdToken().getJwtToken(),
                                    refreshToken: authenticateResult.getRefreshToken().getToken(),
                                });
                            },
                            onFailure: function (err) {
                                console.log(err.message);
                                reject({
                                    status: 500,
                                    message: err.message,
                                });
                            },
                        });
                    },
                    onFailure: function (err) {
                        console.log(err);
                        reject({
                            status: 500,
                            message: err.message,
                        });
                    },
                });
            });
        });
    }
    verifyUserAttribute(tokens, body) {
        return __awaiter(this, void 0, void 0, function* () {
            var cognitoTokens = JSON.parse(tokens);
            var cognitoUser = this.createCognitoUser(body.username);
            var cognitoSession = this.createCognitoSession(cognitoTokens);
            return yield new Promise(function (resolve, reject) {
                if (cognitoSession.isValid()) {
                    cognitoUser.setSignInUserSession(cognitoSession);
                    cognitoUser.verifyAttribute("email", body.code, {
                        onSuccess: () => {
                            resolve({ status: 200, message: "Success" });
                        },
                        onFailure: (err) => {
                            console.log(err);
                            reject({ status: 500, message: err.message });
                        },
                    });
                }
                else {
                    reject({ status: 502, message: "Invalid session" });
                }
            });
        });
    }
    changeUserAttribute(tokens, body) {
        return __awaiter(this, void 0, void 0, function* () {
            var cognitoTokens = JSON.parse(tokens);
            var cognitoUser = this.createCognitoUser(body.username);
            var cognitoSession = this.createCognitoSession(cognitoTokens);
            let attributeList = [];
            attributeList.push(new amazon_cognito_identity_js_1.CognitoUserAttribute({
                Name: body.attributeName,
                Value: body.attributeValue,
            }));
            return yield new Promise(function (resolve, reject) {
                if (cognitoSession.isValid()) {
                    cognitoUser.setSignInUserSession(cognitoSession);
                    cognitoUser.updateAttributes(attributeList, (err, result) => {
                        if (err) {
                            console.log(err || JSON.stringify(err));
                            reject({ status: 500, message: err.message });
                        }
                        resolve({ status: 200 });
                    });
                }
                else {
                    reject({ status: 500, message: ResponseMessagesEnum_1.ResponseMessages.INVALID_SESSION });
                }
            });
        });
    }
    verifyUserEmail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            var cognitoUser = this.createCognitoUser(body.username);
            return yield new Promise(function (resolve, reject) {
                cognitoUser.confirmRegistration(body.code, true, function (err, result) {
                    if (err) {
                        console.log(err.message || JSON.stringify(err));
                        reject({ status: 500, message: err.message });
                    }
                    resolve({ status: 200 });
                });
            });
        });
    }
    resendSms(body) {
        return __awaiter(this, void 0, void 0, function* () {
            var cognitoUser = this.createCognitoUser(body.username);
            return yield new Promise(function (resolve, reject) {
                cognitoUser.resendConfirmationCode((err, result) => {
                    if (err) {
                        console.log(err.message || JSON.stringify(err));
                        reject({ status: 500, message: err.message });
                    }
                    console.log(result);
                    resolve({ status: 200 });
                });
            });
        });
    }
    signInUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            var authenticationData = {
                Username: body.username,
                Password: body.password,
            };
            var authenticationDetails = new amazon_cognito_identity_js_1.AuthenticationDetails(authenticationData);
            var cognitoUser = this.createCognitoUser(body.username);
            return yield new Promise(function (resolve, reject) {
                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: function (result) {
                        return __awaiter(this, void 0, void 0, function* () {
                            console.log("Successfully authenticated");
                            const user = yield userService_1.UserService.getUserByEmail(body.username);
                            resolve({
                                status: 200,
                                accessToken: result.getAccessToken().getJwtToken(),
                                idToken: result.getIdToken().getJwtToken(),
                                refreshToken: result.getRefreshToken().getToken(),
                                user: user,
                            });
                        });
                    },
                    onFailure: function (err) {
                        console.log(err);
                        if (err.code == "UserNotConfirmedException") {
                            reject({ status: 500, message: ResponseMessagesEnum_1.ResponseMessages.MFA_NEEDED });
                        }
                        reject({ status: 500, message: ResponseMessagesEnum_1.ResponseMessages.AUTH_FAILED });
                    },
                });
            });
        });
    }
    signOutUser(tokens, body) {
        return __awaiter(this, void 0, void 0, function* () {
            var cognitoTokens = JSON.parse(tokens);
            var cognitoUser = this.createCognitoUser(body.username);
            var cognitoSession = this.createCognitoSession(cognitoTokens);
            return yield new Promise(function (resolve, reject) {
                if (cognitoSession.isValid()) {
                    cognitoUser.setSignInUserSession(cognitoSession);
                    cognitoUser.globalSignOut({
                        onSuccess: function (_) {
                            resolve({ status: 200, message: ResponseMessagesEnum_1.ResponseMessages.SIGNED_OUT });
                        },
                        onFailure: function (err) {
                            reject({ status: 500, message: err.message });
                        },
                    });
                }
            });
        });
    }
    changePassword(tokens, body) {
        return __awaiter(this, void 0, void 0, function* () {
            var cognitoTokens = JSON.parse(tokens);
            var cognitoUser = this.createCognitoUser(body.username);
            var cognitoSession = this.createCognitoSession(cognitoTokens);
            return yield new Promise(function (resolve, reject) {
                if (cognitoSession.isValid()) {
                    cognitoUser.setSignInUserSession(cognitoSession);
                    cognitoUser.changePassword(body.oldPassword, body.newPassword, (err, result) => {
                        if (err) {
                            console.log(err.message || JSON.stringify(err));
                            reject({ status: 500, message: err.message });
                        }
                        resolve({ status: 200, message: ResponseMessagesEnum_1.ResponseMessages.PASS_CHANGED });
                    });
                }
                else {
                    reject({ status: 502, message: ResponseMessagesEnum_1.ResponseMessages.INVALID_SESSION });
                }
            });
        });
    }
    startForgotPassword(body) {
        return __awaiter(this, void 0, void 0, function* () {
            var cognitoUser = this.createCognitoUser(body.username);
            return yield new Promise(function (resolve, reject) {
                cognitoUser.forgotPassword({
                    onSuccess: function (data) {
                        console.log("Success, data:", data);
                        resolve({
                            status: 200,
                            message: ResponseMessagesEnum_1.ResponseMessages.STARTED_PASS_RESET,
                        });
                    },
                    onFailure: function (err) {
                        reject({ status: 500, message: err });
                    },
                });
            });
        });
    }
    completeForgotPassword(body) {
        return __awaiter(this, void 0, void 0, function* () {
            var cognitoUser = this.createCognitoUser(body.username);
            return yield new Promise(function (resolve, reject) {
                cognitoUser.confirmPassword(body.code, body.password, {
                    onSuccess: function (data) {
                        console.log("Success data:", data);
                        resolve({
                            status: 200,
                            message: ResponseMessagesEnum_1.ResponseMessages.COMPLETED_PASS_RESET,
                        });
                    },
                    onFailure: function (err) {
                        reject({ status: 500, message: err });
                    },
                });
            });
        });
    }
    validateToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const properties = {
                userPoolId: poolData.UserPoolId,
                tokenUse: "access",
                clientId: poolData.ClientId,
            };
            const verifier = aws_jwt_verify_1.CognitoJwtVerifier.create(properties);
            try {
                const payload = yield verifier.verify(accessToken);
                return true;
            }
            catch (e) {
                console.log("Verify error: ", e);
                return false;
            }
        });
    }
}
exports.CognitoService = CognitoService;
