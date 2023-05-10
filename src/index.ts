import express from "express";
import { APPCONFIGS } from "./configs";
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from "./routes";
import * as swaggerUi from "swagger-ui-express";


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
    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: "/swagger.json",
        },
      })
    );

    routes(this.app);
  }

//   public config(): void {
//     this.app.set("port", APPCONFIGS.PORT);
//     this.app.use(express.json());

//     routes(this.app);
//   }

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server listening in port", APPCONFIGS.PORT);
    });
  }
}

const server = new Server();
server.start();
