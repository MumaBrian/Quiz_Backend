import express from "express";
import { AuthController } from "../../contollers";

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

		this.router.post("/register/participant", async (req, res, _next) => {
			try {
				const response = await new AuthController().registerParticipant(
					req.body
				);
				res.status(201).send(response);
			} catch (e) {
				console.log(e);

				res.status(500).send({ error: "unknown Error" });
			}
		});

		this.router.post("/verify/participantemail", async (req, res, _next) => {
			try {
				const response = await new AuthController().verifyParticipantEmail(
					req.body
				);
				res.status(201).send(response);
			} catch (e) {
				console.log(e);

				res.status(500).send({ error: "unknown Error" });
			}
		});

		// 
		
		this.router.post("/login/participant", async (req, res, _next) => {
			try {
				const response = await new AuthController().loginParticipant(
					req.body
				);

				res.status(201).send(response);
			} catch (error) {
				res.status(500).send({ error: "unknown Error" });
			}
		});
	}
}
