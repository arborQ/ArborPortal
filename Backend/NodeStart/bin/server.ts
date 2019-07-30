import 'module-alias/register';
import bodyParser from "body-parser";
import express from "express";
import http from "http";
import connectToDatabase from '../repository';
import soi from 'socket.io';
import * as configSetting from '../config';
import apiRouter from '../areas';
import jwtPayloadMiddleware from '@bx-middlewares/jwtPayload';



connectToDatabase().then((connection) => {
    if (!connection) {
        return;
    }
    const app = express();
    const server = (http as any).Server(app);

    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    app.use(jwtPayloadMiddleware());

    app.use(configSetting.app.apiPath, apiRouter);
    app.use((error, request, response, next) => {
        response.status(error.code).send({ errorMessage: error.message });
    });

    const socet = soi(server);

    socet.on('connection', function (socket) {
        console.log('a user connected');
    });

    server.listen(configSetting.app.port, () => {
        console.log(`Express: server running at: http://localhost:${configSetting.app.port}${configSetting.app.apiPath}`);
    });
});