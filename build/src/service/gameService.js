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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const models_1 = __importDefault(require("../models"));
const ResponseMessagesEnum_1 = require("../models/ResponseMessagesEnum");
const sequelize_1 = require("sequelize");
const Game = require("../models/game")(models_1.default.sequelize, models_1.default.Sequelize.DataTypes);
class GameService {
    createGame(game) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbGame = yield Game.create(game);
            return {
                status: 200,
                game: dbGame,
            };
        });
    }
    getGameByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Game.findOne({
                    where: {
                        code: code,
                    },
                });
                return result;
            }
            catch (error) {
                console.log(error);
                throw { status: 500, message: ResponseMessagesEnum_1.ResponseMessages.NO_GAME_FOUND };
            }
        });
    }
    getLeaderboard() {
        return __awaiter(this, void 0, void 0, function* () {
            let topFive = {};
            const addToLeaderboard = (player) => {
                if (topFive[`${player.name}`]) {
                    topFive[`${player.name}`] += 1;
                }
                else {
                    topFive[`${player.name}`] = 1;
                }
            };
            try {
                const games = yield Game.findAll({
                    where: {
                        winner: {
                            [sequelize_1.Op.ne]: null,
                        },
                    },
                });
                for (let game of games) {
                    if (game.winner == "x") {
                        addToLeaderboard(game.user1);
                    }
                    else {
                        addToLeaderboard(game.user2);
                    }
                }
                let leaderboard = [];
                for (let wins in topFive) {
                    leaderboard.push([wins, topFive[wins]]);
                }
                leaderboard.sort((a, b) => {
                    return b[1] - a[1];
                });
                if (leaderboard.length >= 5) {
                    return leaderboard.slice(0, 5);
                }
                else {
                    return leaderboard;
                }
            }
            catch (error) {
                console.log(error);
                throw { status: 500, message: ResponseMessagesEnum_1.ResponseMessages.LEADERBOARD_ERROR };
            }
        });
    }
    updateGame(game) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Game.update(game, {
                    where: {
                        code: game.code,
                    },
                    returning: true,
                    plain: true,
                });
                return {
                    status: 200,
                    game: result[1].dataValues,
                };
            }
            catch (error) {
                console.error(error.name);
                throw {
                    status: 500,
                    description: error.message,
                    info: "Failed to update game",
                };
            }
        });
    }
}
exports.GameService = GameService;
