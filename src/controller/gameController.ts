import { Body, Controller, Get, Post, Put, Route, Query } from "tsoa";
import { GameService } from "../service/gameService";
import { GameUpdateBody } from "../models/types/game/GameUpdateBody";

@Route("game")
export class GameController extends Controller {
  GameService = new GameService();

  @Get("/leaderboard")
  public async getLeaderboard(): Promise<any> {
    try {
      return this.GameService.getLeaderboard();
    } catch (err: any) {
      this.setStatus(err.status);
      return err;
    }
  }

  @Post("")
  public async createGame(@Body() game: any) {
    try {
      return await this.GameService.createGame(game);
    } catch (err: any) {
      this.setStatus(err.status);
      return err;
    }
  }

  @Put("")
  public async updateGame(@Body() game: Partial<GameUpdateBody>): Promise<any> {
    try {
      return await this.GameService.updateGame(game);
    } catch (err: any) {
      console.log(err);
      this.setStatus(err.status);
      return err;
    }
  }

  @Get("/code")
  public async getGameByCode(@Query() code: string): Promise<any> {
    try {
      return this.GameService.getGameByCode(code);
    } catch (err: any) {
      this.setStatus(err.status);
      return err;
    }
  }
}
