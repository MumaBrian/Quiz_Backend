import { AdminController } from "../../contollers";
import { Admin } from "../../types";
import express from "express";

export default class AdminRoutes {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.router.post("/login", async (req, res, _next) => {
      try {
        const admin: Admin | undefined = req.body;
        // Validate admin input...

        const result: Admin | null = await new AdminController().login(admin);

        if (result === null) {
          return res.status(400).send({ error: "This admin doesn't exist" });
        }

        return res.send({ admin: result });
      } catch (e) {
        res.status(500).send({ error: "Unknown error" });
      }
    });

    // Rest of the AuthRoutes code...
  }
}
