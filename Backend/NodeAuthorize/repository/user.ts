import BaseRepository, { RepositorySchema } from './baseRepository';
import { Entity } from './baseRepository';

export interface IUserModel {
    externalId: string;
    login: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    isActive: boolean;
    pictureUrl: string;
    roles?: string[];
    logins?: ILoginInfoModel[];
}

export interface ILoginInfoModel {
    sessionKey: string;
    clientUrl: string;
    createdAt: Date;
    expiredAt: Date;
}

const loginInfoSchema: RepositorySchema<ILoginInfoModel> = {
    sessionKey: { type: String, required: true },
    clientUrl: { type: String, required: true },
    createdAt: { type: Date, required: true },
    expiredAt: { type: Date, required: true }
}

const userSchema: RepositorySchema<IUserModel> = {
    externalId: { type: String, required: true },
    login: { type: String, required: true },
    email: { type: String, required: false, default: null },
    firstName: { type: String, required: false, default: null },
    lastName: { type: String, required: false, default: null },
    pictureUrl: { type: String, required: false, default: null },
    isActive: { type: Boolean, default: true },
    roles: { type: [String], default: ['regular', 'new'] },
    logins: { type: [loginInfoSchema] }
};

class UserRepository extends BaseRepository<IUserModel> {
    constructor() {
        super('user', userSchema);
    }

    public async storeNewExternalLogin(userModel: IUserModel, loginInfo: ILoginInfoModel): Promise<Entity<IUserModel>> {
        const [dbUser] = await super.find({ externalId: userModel.externalId });
        const { login, email, firstName, lastName, pictureUrl, isActive, roles } = userModel;

        const updatedDbUser: Partial<Entity<IUserModel>> = {
            _id: dbUser._id,
            externalId: dbUser.externalId,
            login,
            email,
            firstName,
            lastName,
            pictureUrl,
            isActive,
            roles: dbUser.roles ? [...dbUser.roles, ...roles] : roles,
            logins: [...dbUser.logins || [], loginInfo]
        };
        console.log({ updatedDbUser });
        return await super.update(updatedDbUser._id, updatedDbUser);
    }

}

export const userRepository = new UserRepository();