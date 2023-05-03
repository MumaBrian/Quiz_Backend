import express from "express";
import {AuthController }from '../../contollers'
export default class AuthRoutes {
     public router: express.Router;
  private authController: AuthController;

  constructor() {
    this.router = express.Router();
    this.authController = new AuthController();
    this.registerRoutes();
  }
    protected registerRoutes(): void {
        this.router.post('/', this.authController.login);
        this.router.post('/login', this.authController.getUserByEmail);

        this.router.get("/register", async (_req, res, _next) => {
            try {
                res.send({ msg: "register should be a post method" })
            } catch (e) {
                res.status(500).send({ error: "unknown Error" });
            }
        });
    }
}

