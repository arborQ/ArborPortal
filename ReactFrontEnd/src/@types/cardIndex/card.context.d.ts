declare namespace CardIndex.Context {
    export interface ICardIndexItem {
        id : number;
    }
    export interface ICardIndexContext<T extends ICardIndexItem> {
        items: T[],
        itemsLoaded: (items: T[]) => void;
        itemUpdated: (item: T) => void;
        itemDeleted: (itemId: number) => void;
    }
}