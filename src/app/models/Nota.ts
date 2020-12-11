export interface Nota {
    id?: string,
    pinned: boolean,
    titulo: string,
    descripcion: string,
    color: string,
    usuarios: string[],
    imagenes: string[]
}