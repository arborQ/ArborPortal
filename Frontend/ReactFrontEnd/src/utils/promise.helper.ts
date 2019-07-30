export interface ICancelablePromise<T> {
    cancel(): void;
    promise: Promise<T>;
}

class CancalablePromise<T> implements ICancelablePromise<T> {
    private isCancelled: boolean = false;
    constructor(private originalPromise: Promise<T>) {

    }

    get promise(): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.originalPromise
                .then(val => this.isCancelled ? reject({ isCancelled: this.isCancelled }) : resolve(val))
                .catch(error => this.isCancelled ? reject({ isCancelled: this.isCancelled }) : reject(error))
        });
    }

    cancel(): void {
        this.isCancelled = true;
    }
}

export function makeCancelable<T>(promise: Promise<T>): ICancelablePromise<T> {
    return new CancalablePromise<T>(promise);
}