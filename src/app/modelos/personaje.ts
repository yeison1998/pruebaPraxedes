export interface Personaje {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    image: string,
    esFavorito: boolean
}

export interface Favorito {
    id_caracter: number,
    observaciones: string,
    usuario: string
}
