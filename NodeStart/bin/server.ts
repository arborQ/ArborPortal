import bodyParser from "body-parser";
import express from "express";
import http from "http";
import cookieParser from 'cookie-parser';
// import * as socket from "socket.io";
import * as configSetting from '../config';
import apiRouter from '../routes';

const app = express();
const server = (http as any).Server(app);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());

app.use(configSetting.app.apiPath, apiRouter);

server.listen(configSetting.app.port, () => {
    console.log(`Express: server running at: http://localhost:${configSetting.app.port}${configSetting.app.apiPath}/account/authorize`);
});