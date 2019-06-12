declare namespace Utils.Api {
    interface IQueryResponse<T> {
        items: T[];
        totalCount: number;
    }
}