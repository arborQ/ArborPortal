import * as bodyParser from "body-parser";
import * as express from "express";
import * as http from "http";
import * as socket from "socket.io";

const config = {
    serverPort: 8011,
    serverHost: "localhost"
}

const app = express();
const server = (http as any).Server(app);
const io = socket(server);

let users: number = 0;

io.on("connection", (soc) => {
    console.log("user connected");
    setTimeout(() => {
        soc.emit("news", { m: `hi new user: ${++users}` });
    }, 1000);

    soc.on("disconnect", () => {
        console.log("user connected");
    });
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("/api/users", (request, reply) => {
    reply.send({ ok: true });
});

// app.get("/api/users", (request, reply) => {
//     controllers.GetAllUsers().then((data) => {
//         reply.send({ users: data });
//     });
// });

// // tslint:disable-next-line:forin
// for (const index in controllers) {
//     const controller = new controllers[index]();

//     app.get(`/api/${index}${controller.path}`, (request, reply) => {
//         controller.handler(request).then((data) => {
//             reply.send(data);
//         });
//     });

// }

server.listen(config.serverPort, () => {
    console.log(`Express: server running at: ${config.serverPort}`);
});