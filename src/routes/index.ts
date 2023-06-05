import express from "express";
import { HealthRoutes } from "./health";
import { APPCONFIGS } from "../configs";
import { AuthRoutes } from "./auth";
import { QuizRoutes } from "./quiz";
import { CategoryRoutes } from "./category";

const routes = (server: express.Application): void => {
	server.use(`${APPCONFIGS.BASE_PATH}/health`, new HealthRoutes().router);
	server.use(`${APPCONFIGS.BASE_PATH}/auth`, new AuthRoutes().router);
	server.use(`${APPCONFIGS.BASE_PATH}/quiz`, new QuizRoutes().router);
	server.use(`${APPCONFIGS.BASE_PATH}/category`, new CategoryRoutes().router);

};

export default routes;
