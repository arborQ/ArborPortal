import { connect } from 'mongoose';
import { database } from '../config';
export { userRepository, IUserModel } from './user';

async function connectToDatabase() {
    try {
        const connection = await connect(database.mongoConnectionString, { useNewUrlParser: true });

        return connection;
    } catch (error) {
        console.log("MONGO ERROR: ", error);
        return null;
    }
}

export default connectToDatabase;