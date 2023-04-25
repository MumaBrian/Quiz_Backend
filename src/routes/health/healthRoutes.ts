import express from "express";

export default class HealthRoutes {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.router.get("/", async (_req, res, _next) => {
            try {
                res.send({ msg: "pong" })
                /// TODO: After authentication, we will do a message handler utility.
            } catch (e) {
                res.status(500).send({ error: "unknown Error" });
            }
        });
    }
}