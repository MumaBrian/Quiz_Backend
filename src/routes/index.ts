import express from "express";
import { HealthRoutes } from "./health";
import { APPCONFIGS } from "../configs";

const routes = (server: express.Application): void => {
    server.use(`${APPCONFIGS.BASE_PATH}/health`, new HealthRoutes().router);
};

export default routes;