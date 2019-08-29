declare namespace Utils.Storage {
    export interface IDataStorage<T> {
        getData(): Promise<T> | T;
        updateData(data: T): Promise<void> | void;
        clear(): Promise<void> | void;
    }
}
