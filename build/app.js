"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./build/routes");
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
exports.app = (0, express_1.default)();
// Use body parser to read sent json payloads
// const whiteList = ["https://games.kraftylab.com"];
// const corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (whiteList.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
exports.app.use((0, cors_1.default)());
exports.app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
exports.app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
exports.app.use(body_parser_1.default.json());
(0, routes_1.RegisterRoutes)(exports.app);
exports.app.use(function errorHandler(err, req, res, next) {
    if (err instanceof Error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
    next();
});
