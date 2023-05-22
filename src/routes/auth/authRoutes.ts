<<<<<<< HEAD
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
=======
import { AuthController } from "../../contollers";
import { User } from "../../types";
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

        this.router.post("/login", async (req, res, _next) => {
            try {
                const user: User | undefined = req.body;
                const isVerify: string | undefined = req.query.is_verified;

                if (user === undefined) {
                    return res.status(400).send({ error: "Incorrect inputs." });
                }
                const result: User | undefined = new AuthController().login(user, isVerify)

                if (result === undefined) {
                    return res.status(400).send({ error: "This user doesn't exist" });
                }
                return res.send({ user: user })
            } catch (e) {
                res.status(500).send({ error: "unknown Error" });
            }
        });

        this.router.get("/register", async (_req, res, _next) => {
            try {
                res.send({ msg: "register should be a post method" })
            } catch (e) {
                res.status(500).send({ error: "unknown Error" });
            }
        });
    }
}

>>>>>>> 32f3f9769f54a639f71eb714985f8a6cf0d12161
