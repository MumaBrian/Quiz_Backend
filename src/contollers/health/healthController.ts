import { Health } from "../../types";
import { HealthSevice } from "../../services";

export default class HealthController {
    /**
     * Test if API is available
     */
    public getHealth(): Health {
        const result = (new HealthSevice()).getHealth()
        console.log(`---------------${result}`)
        return result;
    }
}
