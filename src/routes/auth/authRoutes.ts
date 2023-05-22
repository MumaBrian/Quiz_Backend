import express from "express";

export default class AuthRoutes {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.router.get("/login", async (_req, res, _next) => {
      try {
        res.send({ msg: "login should be a post method" });
      } catch (e) {
        res.status(500).send({ error: "unknown Error" });
      }
    });

    this.router.get("/register", async (_req, res, _next) => {
      try {
        res.send({ msg: "register should be a post method" });
      } catch (e) {
        res.status(500).send({ error: "unknown Error" });
      }
    });
  }
}
