import { Health } from "../../types";
import { HealthSevice } from "../../services";
import { Route, Get, Tags, Example } from "tsoa";

@Route("/api/")
@Tags("Health Controller Operations")
export default class HealthController {
  /**
   * Test if API is available
   */
  @Example<Health>({
    msg: "pong",
  })
  @Get("/health")
  public getHealth(): Health {
    const result = new HealthSevice().getHealth();
    return result;
  }
}
