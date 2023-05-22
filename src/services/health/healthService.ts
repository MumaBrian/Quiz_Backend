import { Health } from "../../types";

export default class HealthService {
	/**
	 * Test if API is available
	 */
	public getHealth(): Health {
		return { msg: "pong" };
	}
}
