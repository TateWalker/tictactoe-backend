import sequelize from "sequelize/types/sequelize";
import db from "../models";
import { GameAttributes } from "../models/game";
import { ResponseMessages } from "../models/ResponseMessagesEnum";

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
    try {
      // const icebreaker = await Icebreaker.findOne({
      //   where: whereStatement,
      //   order: db.sequelize.random(),
      // });
      // if (typeof icebreaker !== "undefined" && icebreaker !== null) {
      //   icebreaker.dataValues.color = this.getRandomColor();
      //   return icebreaker;
      // } else {
      //   throw new Error(`Failed to get icebreaker`);
      // }
    } catch (error: any) {
      console.log(error);
      throw { status: 500, message: ResponseMessages.ICEBREAKER_NOT_FOUND };
    }
  }

  public async updateGame(game: Partial<GameAttributes>) {
    try {
      const result = await Game.update(game, {
        where: {
          id: game.id,
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

  // public async getIcebreakerCategories(): Promise<any> {
  //   try {
  //     let categories: any = {};
  //     let realCategories: any = {};
  //     let finalCategories: any = {};
  //     const icebreakers = await Icebreaker.findAll();
  //     if (icebreakers && icebreakers.length > 0) {
  //       for (let icebreaker of icebreakers) {
  //         categories[`${icebreaker.category}`] = [];
  //       }
  //       for (let icebreaker of icebreakers) {
  //         categories[`${icebreaker.category}`].push(icebreaker.subcategory);
  //       }
  //       for (let cat in categories) {
  //         realCategories[`${cat}`] = new Set(categories[`${cat}`]);
  //       }
  //       for (let cat in realCategories) {
  //         finalCategories[`${cat}`] = Array.from(
  //           realCategories[`${cat}`].values()
  //         );
  //       }
  //       let response = {
  //         categories: Object.keys(finalCategories),
  //         subcategories: finalCategories,
  //       };
  //       return response;
  //     } else {
  //       throw new Error(`Failed to get icebreakers`);
  //     }
  //   } catch (error: any) {
  //     console.error(error.name);
  //     throw { status: 500, message: ResponseMessages.CATEGORIES_NOT_FOUND };
  //   }
  // }
}
