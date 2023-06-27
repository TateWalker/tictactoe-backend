"use strict";

import { Model } from "sequelize";

export interface User {
  name: string;
  character: string;
  turn: boolean;
}

export interface GameAttributes {
  id: number;
  code: string;
  user1: User;
  user2: User;
  board: any;
  winner?: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Game extends Model<GameAttributes> implements GameAttributes {
    id!: number;
    code!: string;
    user1!: User;
    user2!: User;
    board!: any;
    winner?: string;
  }
  Game.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user1: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      user2: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      board: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      winner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
