import { Health } from "../../types";
import { HealthController } from "../../contollers";
import express from "express";

export default class HealthRoutes {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get("/", async (_req, res, _next) => {
            try {
                const healthController = new HealthController();
                let result: Health = healthController.getHealth()
                res.send(result)
            } catch (e) {
                res.status(500).send({ error: "unknown Error" });
            }
        });
    }
}