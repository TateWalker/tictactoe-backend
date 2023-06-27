import sequelize from "sequelize/types/sequelize";
import db from "../models";
import { GameAttributes } from "../models/game";
import { ResponseMessages } from "../models/ResponseMessagesEnum";
import { Op } from "sequelize";

const Game = require("../models/game")(db.sequelize, db.Sequelize.DataTypes);

export class GameService {
  public async createGame(game: GameAttributes): Promise<any> {
    const dbGame = await Game.create(game);
    return {
      status: 200,
      game: dbGame,
    };
  }

  public async getGameByCode(code: string): Promise<GameAttributes> {
    try {
      const result = await Game.findOne({
        where: {
          code: code,
        },
      });
      return result;
    } catch (error: any) {
      console.log(error);
      throw { status: 500, message: ResponseMessages.NO_GAME_FOUND };
    }
  }

  public async getLeaderboard(): Promise<any> {
    let topFive: any = {};

    const addToLeaderboard = (player: any) => {
      if (topFive[`${player.name}`]) {
        topFive[`${player.name}`] += 1;
      } else {
        topFive[`${player.name}`] = 1;
      }
    };

    try {
      const games = await Game.findAll({
        where: {
          winner: {
            [Op.ne]: null,
          },
        },
      });
      for (let game of games) {
        if (game.winner == "x") {
          addToLeaderboard(game.user1);
        } else {
          addToLeaderboard(game.user2);
        }
      }
      let leaderboard = [];
      for (let wins in topFive) {
        leaderboard.push([wins, topFive[wins]]);
      }
      leaderboard.sort((a: any, b: any) => {
        return b[1] - a[1];
      });
      if (leaderboard.length >= 5) {
        return leaderboard.slice(0, 5);
      } else {
        return leaderboard;
      }
    } catch (error: any) {
      console.log(error);
      throw { status: 500, message: ResponseMessages.LEADERBOARD_ERROR };
    }
  }

  public async updateGame(game: Partial<GameAttributes>) {
    try {
      const result = await Game.update(game, {
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
    } catch (error: any) {
      console.error(error.name);
      throw {
        status: 500,
        description: error.message,
        info: "Failed to update game",
      };
    }
  }
}
