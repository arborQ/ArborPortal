import { connect } from 'mongoose';
import { mongoConnectionString } from '@bx-config';
export { recipeRepository } from './recipe';
export { IRecipe } from './models/recipe';

async function connectToDatabase() {
    try {
        const connection = await connect(mongoConnectionString, { useNewUrlParser: true });

        return connection;
    } catch (error) {
        console.log("MONGO ERROR: ", error);
        return null;
    }
}

export default connectToDatabase;