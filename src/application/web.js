import express from 'express';
import cors from 'cors';
import {errorMiddleware} from "../middleware/error-middleware.js";
import {publicRouter} from "../routes/public-api.js";
import {usersRouter} from "../routes/users-api.js";

const corsOptions =  {
    origin: '*',
    method: 'POST,GET,PATCH,DELETE,PUT',
    credentials: false,
}

export const web = express();
web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(cors(corsOptions))
web.use(publicRouter)
web.use(usersRouter)
web.use(errorMiddleware)
