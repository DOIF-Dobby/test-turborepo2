export type Updater<T> = T | ((old: T) => T)
