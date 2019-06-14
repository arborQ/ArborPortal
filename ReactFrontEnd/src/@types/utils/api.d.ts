declare namespace Utils.Api {
    interface IQueryResponse<T> {
        items: T[];
        totalCount: number;
    }

    interface ICreateResponse<T> {
        createdItem: T;
        isSuccessful: boolean;
        validationErrors: { [key: string]: string };
    }
}
