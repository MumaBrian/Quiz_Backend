import express from "express";
import { HealthRoutes } from "./health";
import { APPCONFIGS } from "../configs";
import { AuthRoutes } from "./auth";
import { AdminRoutes } from "./admin";

const routes = (server: express.Application): void => {
	server.use(`${APPCONFIGS.BASE_PATH}/health`, new HealthRoutes().router);
	server.use(`${APPCONFIGS.BASE_PATH}/auth`, new AuthRoutes().router);
	server.use(`${APPCONFIGS.BASE_PATH}/admin`, new AdminRoutes().router);

};

export default routes;
