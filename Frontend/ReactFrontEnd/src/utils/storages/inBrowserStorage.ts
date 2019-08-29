import { compress, decompress } from 'lz-string';
const ls = localStorage;

export default function inBrowserStorage<T>(key: string): Utils.Storage.IDataStorage<T> {
    const storageKey = `___inBrowserStorage:${key}`;

    return {
        updateData: (data: T) => { ls[storageKey] = compress(JSON.stringify(data)); },
        getData: () => {
            const data: string = ls[storageKey];
            if (data === undefined) {
                return {} as T;
            }
            const decompresedData = decompress(data);

            return JSON.parse(decompresedData) as T;
        },
        clear: () => { delete ls[storageKey]; }
    };
}
