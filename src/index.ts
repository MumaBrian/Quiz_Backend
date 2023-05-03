import express from "express";
import { APPCONFIGS } from "./configs";
import routes from "./routes";

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    public config(): void {
        this.app.set("port", APPCONFIGS.PORT);
        this.app.use(express.json());

        routes(this.app);
    }

    public start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server listening in port", APPCONFIGS.PORT);

        });
    }
}

const server = new Server();
server.start();
