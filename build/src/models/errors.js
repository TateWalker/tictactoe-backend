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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.BadRequestError = exports.ExtendedError = void 0;
const httpStatus = __importStar(require("http-status"));
const typescript_rest_1 = require("typescript-rest");
class ExtendedError extends typescript_rest_1.Errors.HttpError {
    constructor(name, statusCode, description, info, body) {
        super(name, description);
        this.info = info;
        this.body = body;
    }
}
exports.ExtendedError = ExtendedError;
class BadRequestError extends ExtendedError {
    constructor({ description, info, body }) {
        super('BadRequestError', httpStatus.BAD_REQUEST, description, info, body);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
exports.BadRequestError = BadRequestError;
class InternalServerError extends ExtendedError {
    constructor({ description, info, body }) {
        super('BadRequestError', httpStatus.INTERNAL_SERVER_ERROR, description, info, body);
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}
exports.InternalServerError = InternalServerError;
