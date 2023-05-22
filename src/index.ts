import express from "express";
import { APPCONFIGS } from "./configs";
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from "./routes";
import * as swaggerUi from "swagger-ui-express";
import { firebaseInstance } from "./firebase";
// import {UtilService} from "./services";

class Server {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.config();
	}
	public config(): void {
		this.app.set("port", APPCONFIGS.PORT);
		this.app.use(express.json());
		this.app.use(express.static("public"));
		firebaseInstance.init();
		this.app.use(
			"/docs",
			swaggerUi.serve,
			swaggerUi.setup(undefined, {
				swaggerOptions: {
					url: "/swagger.json"
				}
			})
		);

<<<<<<< HEAD
		// this.app.get('/api/user', async (req, res) => {
		// 	const user = await new UtilService().getRecord('users', '2sfGGlxqP5gFgAYjcNPq2IQle6D2');
		// 	res.send(user)
		// })
=======
    public config(): void {
        this.app.set("port", APPCONFIGS.PORT);
        this.app.use(express.json());
>>>>>>> 32f3f9769f54a639f71eb714985f8a6cf0d12161

		// routes(this.app);
	}

	public start(): void {
		this.app.listen(this.app.get("port"), () => {
			console.log("Server listening in port", APPCONFIGS.PORT);
		});
	}
}

const server = new Server();
server.start();
