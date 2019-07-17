export function toggleItem<T>(collection: T[], item: T, compare?: (a: T, b: T) => boolean): T[] {
    function contains(collection: T[], item: T, compare?: (a: T, b: T) => boolean): boolean {
        return compare === undefined ? collection.indexOf(item) !== -1 : collection.find(a => compare(a, item));
    }

    if (compare === undefined ? collection.indexOf(item) !== -1 : collection.find(a => compare(a, item))) {
        return collection;
    }
}