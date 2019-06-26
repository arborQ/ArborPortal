import * as bodyParser from "body-parser";
import * as express from "express";
import * as http from "http";
import * as cookieParser from 'cookie-parser';
import * as session  from 'express-session';
// import * as socket from "socket.io";
import * as configSetting from '../config';
import apiRouter from '../routes';

const app = express();
const server = (http as any).Server(app);
// const io = socket(server);

// let users: number = 0;

// io.on("connection", (soc) => {
//     console.log("user connected");
//     setTimeout(() => {
//         soc.emit("news", { m: `hi new user: ${++users}` });
//     }, 1000);

//     soc.on("disconnect", () => {
//         console.log("user connected");
//     });
// });

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
app.use(session({
    secret: configSetting.app.cookieSecretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

app.use(configSetting.app.apiPath, apiRouter);

server.listen(configSetting.app.port, () => {
    console.log(`Express: server running at: http://localhost:${configSetting.app.port}${configSetting.app.apiPath}/account/authorize`);
});