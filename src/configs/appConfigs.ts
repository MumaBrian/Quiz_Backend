import * as dotenv from "dotenv";

dotenv.config();

const APPCONFIGS = {
	PORT: process.env.PORT || 8000,
	BASE_PATH: "/api",
	SESSION: {
		SESSION_SECRET: "likely-to-change-now",
	},
	JWT: {
		EXPIRATION: 360,
		COOKIE_EXPIRATION: 360,
		SECRET: "thesecret",
	},
	MAIL: {
		TRANSPORT: process.env.EMAIL_TRANSPORT,
		FROM: process.env.EMAIL_FROM || "no-reply@camsol.tech",
		SMTP_HOST: process.env.EMAIL_SMTP_HOST || "mail.camsol.tech",
		SMTP_PORT: process.env.EMAIL_SMTP_PORT || 587,
		SMTP_USER: process.env.EMAIL_SMTP_USER || "no-reply@camsol.tech",
		SMTP_PASSWORD: process.env.EMAIL_SMTP_PASSWORD || "87,idyNAt,%",
		SMTP_SECURE: process.env.EMAIL_SMTP_SECURE || false,
		OTP_SUBJECT: "Quiz App OTP",
	},
};

export default APPCONFIGS;
