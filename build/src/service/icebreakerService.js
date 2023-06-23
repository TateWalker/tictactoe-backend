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
exports.IcebreakerService = void 0;
const models_1 = __importDefault(require("../models"));
const ResponseMessagesEnum_1 = require("../models/ResponseMessagesEnum");
const Icebreaker = require("../models/icebreaker")(models_1.default.sequelize, models_1.default.Sequelize.DataTypes);
const ColorData = [
    {
        name: "yellow",
        color: "radial-gradient(218.51% 281.09% at 100% 100%, rgba(208, 142, 13, 0.6) 0%, rgba(76, 0, 200, 0.6) 45.83%, rgba(76, 0, 200, 0.6) 100%)",
    },
    {
        name: "green",
        color: "radial-gradient(218.51% 281.09% at 100% 100%, rgba(49, 220, 113, 0.6) 0%, rgba(76, 0, 200, 0.6) 45.83%, rgba(76, 0, 200, 0.6) 100%)",
    },
    {
        name: "blue",
        color: "radial-gradient(218.51% 281.09% at 100% 100%, rgba(118, 247, 255, 0.6) 0%, rgba(76, 0, 200, 0.6) 45.83%, rgba(76, 0, 200, 0.6) 100%)",
    },
    {
        name: "red",
        color: "radial-gradient(218.51% 281.09% at 100% 100%, rgba(253, 63, 51, 0.6) 0%, rgba(76, 0, 200, 0.6) 45.83%, rgba(76, 0, 200, 0.6) 100%)",
    },
];
class IcebreakerService {
    getRandomColor() {
        var randomIndex = Math.floor(Math.random() * ColorData.length);
        return ColorData[randomIndex].color;
    }
    createIcebreaker(icebreaker) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbIcebreaker = yield Icebreaker.create(icebreaker);
            return {
                status: 200,
                icebreaker: dbIcebreaker,
            };
        });
    }
    getAllIcebreaker() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const icebreakers = yield Icebreaker.findAll();
                if (icebreakers && icebreakers.length > 0) {
                    for (let i = 0; i < icebreakers.length; i++) {
                        icebreakers[i].dataValues.color = this.getRandomColor();
                    }
                    return icebreakers;
                }
                else {
                    throw new Error(`Failed to get icebreakers`);
                }
            }
            catch (error) {
                console.error(error.name);
                throw { status: 500, message: ResponseMessagesEnum_1.ResponseMessages.ICEBREAKER_NOT_FOUND };
            }
        });
    }
    getRandomIcebreaker() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const icebreaker = yield Icebreaker.findOne({
                    order: models_1.default.sequelize.random(),
                });
                if (typeof icebreaker !== "undefined" && icebreaker !== null) {
                    icebreaker.dataValues.color = this.getRandomColor();
                    return icebreaker;
                }
                else {
                    throw new Error(`Failed to get icebreaker`);
                }
            }
            catch (error) {
                console.error(error);
                throw { status: 500, message: ResponseMessagesEnum_1.ResponseMessages.ICEBREAKER_NOT_FOUND };
            }
        });
    }
    getIcebreakerByCategory(category, subcategory) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let whereStatement = { category: category };
                if (subcategory) {
                    whereStatement = Object.assign(Object.assign({}, whereStatement), { subcategory: subcategory });
                }
                const icebreaker = yield Icebreaker.findOne({
                    where: whereStatement,
                    order: models_1.default.sequelize.random(),
                });
                if (typeof icebreaker !== "undefined" && icebreaker !== null) {
                    icebreaker.dataValues.color = this.getRandomColor();
                    return icebreaker;
                }
                else {
                    throw new Error(`Failed to get icebreaker`);
                }
            }
            catch (error) {
                console.log(error);
                throw { status: 500, message: ResponseMessagesEnum_1.ResponseMessages.ICEBREAKER_NOT_FOUND };
            }
        });
    }
    updateIcebreaker(icebreaker) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Icebreaker.update(icebreaker, {
                    where: {
                        id: icebreaker.id,
                    },
                    returning: true,
                    plain: true,
                });
                return {
                    status: 200,
                    icebreaker: result[1].dataValues,
                };
            }
            catch (error) {
                console.error(error.name);
                throw {
                    status: 500,
                    description: error.message,
                    info: "Failed to update icebreaker",
                };
            }
        });
    }
    deleteIcebreaker(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(id);
                const result = yield Icebreaker.destroy({
                    where: {
                        id: id,
                    },
                });
                console.log("here");
                console.log(result);
                if (result === 1) {
                    return {
                        status: 200,
                        icebreaker: id,
                    };
                }
                else {
                    throw {
                        status: 500,
                        description: `Failed to delete icebreaker with id of ${id}`,
                        info: "Failed to delete icebreaker",
                    };
                }
            }
            catch (error) {
                console.error(error.name);
                throw {
                    status: 500,
                    description: error.message,
                    info: "Failed to delete icebreaker",
                };
            }
        });
    }
    getIcebreakerCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let categories = {};
                let realCategories = {};
                let finalCategories = {};
                const icebreakers = yield Icebreaker.findAll();
                if (icebreakers && icebreakers.length > 0) {
                    for (let icebreaker of icebreakers) {
                        categories[`${icebreaker.category}`] = [];
                    }
                    for (let icebreaker of icebreakers) {
                        categories[`${icebreaker.category}`].push(icebreaker.subcategory);
                    }
                    for (let cat in categories) {
                        realCategories[`${cat}`] = new Set(categories[`${cat}`]);
                    }
                    for (let cat in realCategories) {
                        finalCategories[`${cat}`] = Array.from(realCategories[`${cat}`].values());
                    }
                    let response = {
                        categories: Object.keys(finalCategories),
                        subcategories: finalCategories,
                    };
                    return response;
                }
                else {
                    throw new Error(`Failed to get icebreakers`);
                }
            }
            catch (error) {
                console.error(error.name);
                throw { status: 500, message: ResponseMessagesEnum_1.ResponseMessages.CATEGORIES_NOT_FOUND };
            }
        });
    }
}
exports.IcebreakerService = IcebreakerService;
