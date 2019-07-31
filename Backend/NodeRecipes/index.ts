import 'module-alias/register';
import bodyParser from "body-parser";
import express from "express";
import http from "http";

import { port, apiPath } from '@bx-config';

const app = express();
const server = (http as any).Server(app);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

server.listen(port, () => {
    console.log(`Express: server running at: http://localhost:${port}${apiPath}`);
});
