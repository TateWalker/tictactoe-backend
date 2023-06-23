import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./build/routes";
import cors from "cors";
import "reflect-metadata";

export const app = express();
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

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

RegisterRoutes(app);

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});
