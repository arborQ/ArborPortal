const storage = localStorage;

class StorageHandler<T> {
    constructor(private key: string) {

    }

    update(model: T): void {
        storage.setItem(this.key, JSON.stringify(model));
    }

    get(): T | null {
        const storeItem = storage.getItem(this.key);

        if (storeItem === null) {
            return null;
        }

        return JSON.parse(storeItem);
    }

    clear(): void {
        storage.removeItem(this.key);
    }
}

export const atuhorizeStore = new StorageHandler<{ token: string }>('bx-authorize-storage');
export const localeStore = new StorageHandler<{ language: 'en' | 'pl' }>('bx-locale-storage');
