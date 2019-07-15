import { connect } from 'mongoose';
import { database } from '../config';
export { userRepository } from './user';

connect(database.mongoConnectionString, { useNewUrlParser: true });