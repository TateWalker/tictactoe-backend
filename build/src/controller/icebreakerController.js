"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.IcebreakerController = void 0;
const tsoa_1 = require("tsoa");
const icebreakerService_1 = require("../service/icebreakerService");
const cognitoService_1 = require("../service/cognitoService");
let IcebreakerController = class IcebreakerController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.IcebreakerService = new icebreakerService_1.IcebreakerService();
        this.CognitoService = new cognitoService_1.CognitoService();
    }
    //get random icebreaker by category
    getIcebreakerByCategory(category, subcategory) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.IcebreakerService.getIcebreakerByCategory(category, subcategory);
            }
            catch (err) {
                this.setStatus(err.status);
                return err;
            }
        });
    }
    getIcebreakerCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.IcebreakerService.getIcebreakerCategories();
            }
            catch (err) {
                this.setStatus(err.status);
                return err;
            }
        });
    }
    getRandomIcebreaker() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.IcebreakerService.getRandomIcebreaker();
            }
            catch (err) {
                this.setStatus(err.status);
                return err;
            }
        });
    }
    getAllIceBreaker() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.IcebreakerService.getAllIcebreaker();
            }
            catch (err) {
                this.setStatus(err.status);
                return err;
            }
        });
    }
    saveIcebreaker(icebreaker) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.IcebreakerService.createIcebreaker(icebreaker);
            }
            catch (err) {
                this.setStatus(err.status);
                return err;
            }
        });
    }
    updateIcebreaker(icebreaker) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.IcebreakerService.updateIcebreaker(icebreaker);
            }
            catch (err) {
                this.setStatus(err.status);
                return err;
            }
        });
    }
    deleteIcebreaker(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("id", body.id);
                return yield this.IcebreakerService.deleteIcebreaker(body.id);
            }
            catch (err) {
                this.setStatus(err.status);
                return err;
            }
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/category"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], IcebreakerController.prototype, "getIcebreakerByCategory", null);
__decorate([
    (0, tsoa_1.Get)("/categories"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IcebreakerController.prototype, "getIcebreakerCategories", null);
__decorate([
    (0, tsoa_1.Get)(""),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IcebreakerController.prototype, "getRandomIcebreaker", null);
__decorate([
    (0, tsoa_1.Get)("/all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IcebreakerController.prototype, "getAllIceBreaker", null);
__decorate([
    (0, tsoa_1.Post)(""),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IcebreakerController.prototype, "saveIcebreaker", null);
__decorate([
    (0, tsoa_1.Put)(""),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IcebreakerController.prototype, "updateIcebreaker", null);
__decorate([
    (0, tsoa_1.Post)("delete"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IcebreakerController.prototype, "deleteIcebreaker", null);
IcebreakerController = __decorate([
    (0, tsoa_1.Route)("icebreaker")
], IcebreakerController);
exports.IcebreakerController = IcebreakerController;
