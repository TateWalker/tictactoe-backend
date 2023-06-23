import { Controller, Get, Route } from "tsoa";

@Route("health")
export class HealthController extends Controller {
  @Get("")
  public async health() {
    return "Oh baby a triple!";
  }
}
