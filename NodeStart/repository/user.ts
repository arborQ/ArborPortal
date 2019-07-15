import { model, Schema, SchemaTypeOpts, Document } from 'mongoose';
import { identifier } from 'babel-types';

export interface IUserModel {
    login: string;
    email: string | null;
    isActive: boolean;
}

const userSchema: { [P in keyof IUserModel]: SchemaTypeOpts<any> } = {
    login: { type: String, required: true },
    email: { type: String, required: false },
    isActive: { type: String, required: true },
};

const userModel = model<IUserModel & Document>('User', new Schema(userSchema));

export const userRepository = {
    create: async (user: IUserModel): Promise<IUserModel | null> => {
        try {
            const newModel = new userModel(user);
            const dbModel = await newModel.save();
            dbModel.populate("user").execPopulate();
            
            return dbModel;
        } catch(error) {
            console.log(error);
            return null;
        }
    }
}