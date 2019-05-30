declare namespace Utils.Types {
    export type PassThruType<P, T> = Pick<P, Exclude<keyof P, keyof T>>;
    export type PassThruReactComponentType<P, T> = React.ComponentType<PassThruType<P, T>>;
}