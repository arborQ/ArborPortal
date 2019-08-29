const memoryStorage: { [id: string]: any; } = {};

export default function inMemoryStorage<T>(key: string): Utils.Storage.IDataStorage<T> {
    return {
        updateData: (data: T) => { memoryStorage[key] = data; },
        getData: () => memoryStorage[key] || {},
        clear: () => { delete memoryStorage[key]; }
    };
}
