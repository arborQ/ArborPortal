import BaseRepository, { RepositorySchema } from './baseRepository';

export interface IUserModel {
    externalId: string;
    login: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    isActive: boolean;
    pictureUrl: string;
    roles?: string[];
}

const userSchema: RepositorySchema<IUserModel> = {
    externalId: { type: String, required: true, index: true, unique: true },
    login: { type: String, required: true },
    email: { type: String, required: false, default: null },
    firstName: { type: String, required: false, default: null },
    lastName: { type: String, required: false, default: null },
    pictureUrl: { type: String, required: false, default: null },
    isActive: { type: Boolean, default: true },
    roles: { type: [String], default: ['regular', 'new'] }
};

class UserRepository extends BaseRepository<IUserModel> {
    constructor() {
        super('user', userSchema);
    }
}

export const userRepository = new UserRepository();