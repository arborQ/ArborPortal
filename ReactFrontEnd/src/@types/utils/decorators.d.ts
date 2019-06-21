declare namespace Utils.Decorators {
    export interface ILoadDataProps<T> {
        data: T;
        reloadDataCallback: () => void;
    }
}