import { Health } from "../../types";

export default class HealthSevice {
	/**
	 * Test if API is available
	 */
	public getHealth(): Health {
		return { msg: "pong" };
	}
}
