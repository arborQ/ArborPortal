import { model, Schema, SchemaTypeOpts, Document, Model } from 'mongoose';

export type RepositorySchema<T> = { [P in keyof T]: SchemaTypeOpts<any> };
export type DatabaseCondition<T> = { [P in keyof T & Document]: DatabaseCondition<T[P]> };

export default abstract class MongoRepository<T> {
    private dataModel: Model<T & Document>;
    public constructor(protected entityName: string, schema: RepositorySchema<T>) {
       this.dataModel = model<T & Document>(entityName, new Schema(schema));
    }

    public async query(condition?: DatabaseCondition<T>): Promise<T[]> {
        return await this.dataModel.find(condition);
    }

    public async create(model: T) : Promise<T | null> {
        try {
            const newModel = new this.dataModel(model);
            const dbModel = await newModel.save();
            
            return dbModel;
        } catch(error) {
            console.log(error);
            return null;
        }
    }
}