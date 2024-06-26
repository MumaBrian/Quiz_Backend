import express from "express";
import { AuthController } from "../../controllers";

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
		//Admin
		this.router.post("/register/admin", async (req, res, _next) => {
			try {
				const response = await new AuthController().registerAdmin(req.body);
				res.status(201).send(response);
			} catch (e) {
				console.log(e);

				res.status(500).send({ error: "unknown Error" });
			}
		});

		this.router.post("/verify/admin-email", async (req, res, _next) => {
			try {
				const response = await new AuthController().verifyAdminEmail(req.body);
				res.status(201).send(response);
			} catch (e) {
				console.log(e);

				res.status(500).send({ error: "unknown Error" });
			}
		});

		this.router.post("/resend/admin-otp", async (req, res, _next) => {
			try {
				const response = await new AuthController().resendAdminOTP(req.body);
				res.status(201).send(response);
			} catch (e) {
				console.log(e);

				res.status(500).send({ error: "unknown Error" });
			}
		});

		this.router.post("/login/admin", async (req, res, _next) => {
			try {
				const response = await new AuthController().loginAdmin(req.body);

				res.status(201).send(response);
			} catch (error) {
				res.status(500).send({ error: "unknown Error" });
			}
		});

		this.router.post("/forgot/admin-password", async (req, res, next) => {
			try {
				const result = await new AuthController().forgotAdminPassword(req.body);

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

		this.router.post("/reset/admin-password", async (req, res, next) => {
			try {
				const response = await new AuthController().resetAdminPassword(
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

		this.router.post("/update/admin-password", async (req, res, next) => {
			try {
				const data = {
					currentPassword: req.body.currentPassword,
					email: req.body.email,
					newPassword: req.body.newPassword,
				};
				const response = await new AuthController().updateAdminPassword(data);
				res.status(200).send(response);
			} catch (error) {
				res.status(500).send({
					error: "Error updating password, please try again",
				});
			}
		});

		//Participant

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
				const response = await new AuthController().loginParticipant(req.body);

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

		//Instructor

		this.router.post("/register/host", async (req, res, _next) => {
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

		this.router.post("/verify/host-email", async (req, res, _next) => {
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

		this.router.post("/resend/host-otp", async (req, res, _next) => {
			try {
				const response = await new AuthController().resendInstructorOTP(
					req.body
				);
				res.status(201).send(response);
			} catch (e) {
				console.log(e);

				res.status(500).send({ error: "unknown Error" });
			}
		});

		this.router.post("/login/host", async (req, res, _next) => {
			try {
				const response = await new AuthController().loginInstructor(req.body);

				res.status(201).send(response);
			} catch (error) {
				res.status(500).send({ error: "unknown Error" });
			}
		});

		this.router.post("/forgot/host-password", async (req, res, next) => {
			try {
				const result = await new AuthController().forgotInstructorPassword(
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

		this.router.post("/reset/host-password", async (req, res, next) => {
			try {
				const response = await new AuthController().resetInstructorPassword(
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

		this.router.post("/update/host-password", async (req, res, next) => {
			try {
				const data = {
					currentPassword: req.body.currentPassword,
					email: req.body.email,
					newPassword: req.body.newPassword,
				};
				const response = await new AuthController().updateInstructorPassword(
					data
				);
				res.status(200).send(response);
			} catch (error) {
				res.status(500).send({
					error: "Error updating password, please try again",
				});
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
				const response = await new AuthController().loginParticipant(req.body);

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
	}
}
