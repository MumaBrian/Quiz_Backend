import nodemailer from "nodemailer";
import { APPCONFIGS } from "./../../configs";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";


export default class Mailer {
	private async createTransporter() {
		return nodemailer.createTransport({
			host: APPCONFIGS.MAIL.SMTP_HOST,
			port: APPCONFIGS.MAIL.SMTP_PORT,
			secureConnection: APPCONFIGS.MAIL.SMTP_SECURE,
			auth: {
				user: APPCONFIGS.MAIL.SMTP_USER,
				pass: APPCONFIGS.MAIL.SMTP_PASSWORD
			},
			tls: {
				ciphers: "SSLv3"
			},
			from: APPCONFIGS.MAIL.FROM
		});
	}

	public async generateOTP(count: number) {
		const code = otpGenerator.generate(count, {
			upperCaseAlphabets: false,
			specialChars: false,
			lowerCaseAlphabets: false
		});

		const salt = await bcrypt.genSalt(12);
		const signedCode = await bcrypt.hash(code, salt);

		return {
			code,
			signedCode
		};
	}

	public async sendOTPMail(email) {
		const { code, signedCode } = await this.generateOTP(6);

		try {
			const message =
				"Your one time passcode (otp) is: " + code + ", Thank you";

			const transporter = await this.createTransporter();

			const mailOptions = {
				from: APPCONFIGS.MAIL.FROM,
				to: email,
				subject: APPCONFIGS.MAIL.OTP_SUBJECT,
				text: message
			};

			const results = await transporter.sendMail(mailOptions);

			if (results["accepted"].length !== 0) {
				return {
					emailSent: true,
					verCode: signedCode
				};
			} else {
				return {
					emailSent: false,
					verCode: ""
				};
			}
		} catch (error) {
			console.log(error);

			return {
				emailSent: false,
				verCode: signedCode
			};
		}
	}
}
