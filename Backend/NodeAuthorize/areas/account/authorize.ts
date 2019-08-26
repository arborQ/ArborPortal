import { Router } from 'express';
import { verify, sign } from 'jsonwebtoken';
import { jwt } from '../../config';
import { userRepository, IUserModel } from '@bx-database';
import notifyNewUser from '../../queues/userQueue';
import { ILoginInfoModel } from '../../repository/user';
import { LogInfo, LogError } from '../../repository/logger';
import express from 'express';
import newGuid from 'uuid/v4';
import { blackListedSessions } from '@bx-cache';

interface IGitHubPayload { nickname: string, email: string, picture: string, sub: string }
interface IFacebookPayload { nickname: string, given_name: string, family_name: string, picture: string, sub: string }
interface IGmailPayload { nickname: string, given_name: string, family_name: string, picture: string, sub: string, email: string }

var router = Router();
const auth0Key = jwt.auth0TokenKey;

function convertPayloadToUser(payload: any): IUserModel {
    if (payload.sub.indexOf('github') === 0) {
        return convertGithubPayloadToUser(payload);
    }

    if (payload.sub.indexOf('facebook') === 0) {
        return convertFacebookPayloadToUser(payload);
    }

    if (payload.sub.indexOf('google-oauth2') === 0) {
        return convertGmailPayloadToUser(payload);
    }

    throw 'Unknown Auth0 provider!!!';
}

function convertFacebookPayloadToUser(payload: IFacebookPayload): IUserModel {
    return {
        externalId: payload.sub,
        firstName: payload.family_name,
        lastName: payload.given_name,
        login: payload.nickname,
        isActive: true,
        pictureUrl: payload.picture
    };
}

function convertGmailPayloadToUser(payload: IGmailPayload): IUserModel {
    return {
        externalId: payload.sub,
        firstName: payload.family_name,
        lastName: payload.given_name,
        login: payload.nickname,
        email: payload.email,
        isActive: true,
        pictureUrl: payload.picture
    };
}

function convertGithubPayloadToUser(payload: IGitHubPayload): IUserModel {
    return {
        externalId: payload.sub,
        login: payload.nickname,
        email: payload.email,
        isActive: true,
        pictureUrl: payload.picture
    };
}

function getLoginInfo(req: express.Request): ILoginInfoModel {
    return {
        sessionKey: newGuid(),
        clientUrl: req.connection.remoteAddress,
        createdAt: new Date(),
        expiredAt: new Date() // TODO: add real expire date
    };
}

router.post("/", async (request: express.Request, reply, next) => {
    const { token } = request.body;
    try {
        const payload: any = verify(token, auth0Key, { algorithms: ['RS256'] });
        if (!!payload) {
            const userData = convertPayloadToUser(payload);
            const info = getLoginInfo(request);
            const dbUserData = await userRepository.storeNewExternalLogin({
                ...userData,
                roles: ['regular']
            }, info);

            LogInfo(`NodeAuthorize: External token authorized: ${userData.login || userData.email}`);
            await notifyNewUser(userData);

            const newPayload = {
                nameid: dbUserData._id,
                email: dbUserData.email,
                unique_name: dbUserData.login,
                sessionKey: info.sessionKey,
                role: dbUserData.roles,
                exp: payload.exp,
                iat: payload.iat
            };

            await blackListedSessions.set(newPayload.sessionKey, payload.exp);

            const token = sign(newPayload, jwt.privateTokenKey);

            reply
                .status(200)
                .send({
                    token,
                });
        }
    } catch (error) {
        LogError(`NodeAuthorize: External token authorize Failed`);
        next(error);
    }
});

router.delete("/", async (req: any, res) => {
    await blackListedSessions.remove(req.payload.sessionKey);

    res.send();
});

export default router;
