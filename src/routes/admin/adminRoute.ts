import express from "express";
import { AdminController } from "../../contollers";
import { Admin } from "../../types";

export default class AdminRoutes {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    const adminController = new AdminController();

    this.router.post("/", adminController.createAdmin.bind(adminController));
  }
}
