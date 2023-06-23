"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.verifyCognitoToken = void 0;
const aws_jwt_verify_1 = require("aws-jwt-verify");
const error_1 = require("aws-jwt-verify/error");
const node_fetch_1 = __importStar(require("node-fetch"));
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const poolData = {
    UserPoolId: config.cognitoUserPoolId,
    ClientId: config.cognitoClientId,
};
function verifyCognitoToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const properties = {
            userPoolId: poolData.UserPoolId,
            tokenUse: "access",
            clientId: poolData.ClientId,
        };
        const verifier = aws_jwt_verify_1.CognitoJwtVerifier.create(properties);
        const token = req.headers.access;
        try {
            const payload = yield verifier.verify(token);
            res.setHeader("access", req.headers.access);
        }
        catch (e) {
            if (e instanceof error_1.JwtExpiredError) {
                console.log("Token expired. Refreshing... ");
                const newToken = yield refreshCognitoToken(req.headers.refresh);
                res.setHeader("access", newToken.access_token);
            }
            else {
                console.log("Error: ", e);
                res.status(401).send(e);
            }
        }
        next();
    });
}
exports.verifyCognitoToken = verifyCognitoToken;
function refreshCognitoToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, node_fetch_1.default)(`https://kraftylab.auth.us-west-2.amazoncognito.com/oauth2/token`, {
            method: "POST",
            headers: new node_fetch_1.Headers({
                "content-type": "application/x-www-form-urlencoded",
            }),
            body: Object.entries({
                grant_type: "refresh_token",
                client_id: poolData.ClientId,
                refresh_token: token,
            })
                .map(([k, v]) => `${k}=${v}`)
                .join("&"),
        });
        if (!res.ok) {
            throw new Error(yield res.json());
        }
        return yield res.json();
    });
}
