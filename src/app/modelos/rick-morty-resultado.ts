import { Paginacion } from "./paginacion";

export interface RickMortyResultado<T> {
    info: Paginacion,
    results: T[]
}