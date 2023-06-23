"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Game extends sequelize_1.Model {
    }
    Game.init({
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
    }, {
        sequelize,
        modelName: "Game",
    });
    return Game;
};
