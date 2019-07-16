import { Router } from 'express';
import { verify, sign } from 'jsonwebtoken';
import { jwt, app } from '../../config';
import { userRepository, IUserModel } from '../../repository';

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

router.post("/account/authorize", async (request, reply, next) => {
    const { token } = request.body;

    try {
        const payload: any = verify(token, auth0Key, { algorithms: ['RS256'] });

        if (!!payload) {
            const userData = convertPayloadToUser(payload);
            await userRepository.create(userData);

            const newPayload = {
                nameid: "12345",
                email: "arbor@o2.pl",
                unique_name: "Łukasz Wójcik",
                role: [
                    "admin",
                    "reciper",
                    "userlist"
                ],
                exp: payload.exp,
                iat: payload.iat
            };
            const token = sign(newPayload, jwt.privateTokenKey);

            reply
                .status(200)
                .cookie(app.authCookieName, token, { maxAge: 86400 })
                .send({
                    token,
                });
        }
    } catch (error) {
        next(error);
    }
});

export default router;
