const Hapi = require('@hapi/hapi');
var Joi = require('@hapi/joi');
const newGuid = require('uuid/v4');
const { sign } = require('jsonwebtoken');

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

var config = require('./config');


const swaggerOptions = {
    info: {
        title: 'Fake Auth in NodeJs',
        version: '0.0.1',
    }
};

const init = async () => {

    const server = Hapi.server({
        port: config.PORT,
        host: 'localhost'
    });

    server.route({
        method: 'POST',
        path: config.enpointPath,
        options: {
            description: 'Fake Login endpoint',
            notes: 'Returns js token for fake user',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    login: Joi.string(),
                    password: Joi.string(),
                }),
            },
            response: {
                schema: Joi.object({
                    token: Joi.string(),
                    isSuccessfull: Joi.boolean()
                }).label('Result')
            },
            handler: (request, h) => {
                const newPayload = {
                    nameid: config.userId,
                    email: `${config.userName}@fake.pl`,
                    unique_name: config.userName,
                    sessionKey: newGuid(),
                    role: config.userRoles,
                };
    
                const token = sign(newPayload, config.PRIVATE_TOKEN_KEY);

                return h
                    .response({ token, isSuccessfull: true })
                    .code(200);
            }
        }
    })


    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();