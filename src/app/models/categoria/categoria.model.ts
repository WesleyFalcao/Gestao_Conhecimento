import { PaginatedFormParams } from "../generics/paginated.model"

export class CategoriaModel extends PaginatedFormParams{
    id: number
    nome: string = ""
}