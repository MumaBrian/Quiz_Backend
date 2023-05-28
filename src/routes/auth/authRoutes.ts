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

		this.router.post("/verify/participant-email", async (req, res, _next) => {
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

		this.router.post("/resend/participant-otp", async (req, res, _next) => {
			try {
				const response = await new AuthController().resendParticipantOTP(
					req.body
				);
				res.status(201).send(response);
			} catch (e) {
				console.log(e);

				res.status(500).send({ error: "unknown Error" });
			}
		});
		
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

		this.router.post("/forgot/participant-password", async (req, res, next) => {
			try {
				const result = await new AuthController().forgotParticipantPassword(
					req.body
				);

				if (!result.error) {
					res.status(200).send({
						message: `Enter the confirmation code sent to ${req.body.email}`,
					});
				} else {
					res.status(400).send(result);
				}
			} catch (error) {
				console.log(error);

				res.status(500).send({
					error: error,
				});
			}
		});

		this.router.post("/reset/participant-password", async (req, res, next) => {
			try {
				const response = await new AuthController().resetParticipantPassword(
					req.body
				);

				let code = 200;

				if (response.error) {
					code = 400;
				}

				res.status(code).send(response);
			} catch (error) {
				res.status(500).send({
					error: "An error occurred while trying to reset your password",
				});
			}
		});

		this.router.post("/update/participant-password", async (req, res, next) => {
			try {
				const data = {
					currentPassword: req.body.currentPassword,
					email: req.body.email,
					newPassword: req.body.newPassword,
				};
				const response = await new AuthController().updateParticipantPassword(
					data
				);
				res.status(200).send(response);
			} catch (error) {
				res.status(500).send({
					error: "Error updating password, please try again",
				});
			}
		});


		this.router.post("/register/instructor", async (req, res, _next) => {
			try {
				const response = await new AuthController().RegisterInstructor(
					req.body
				);
				res.status(201).send(response);
			} catch (e) {
				console.log(e);

				res.status(500).send({ error: "unknown Error" });
			}
		});

		this.router.post("/verify/instructor-email", async (req, res, _next) => {
			try {
				const response = await new AuthController().verifyInstructorEmail(
					req.body
				);
				res.status(201).send(response);
			} catch (e) {
				console.log(e);

				res.status(500).send({ error: "unknown Error" });
			}
		});

	}
}
