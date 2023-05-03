import  dotenv from "dotenv";

dotenv.config();

const APPCONFIGS = {
    PORT: process.env.PORT || 8000,
    BASE_PATH: "/api",

}

export default APPCONFIGS;
