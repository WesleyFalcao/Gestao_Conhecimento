import { PaginatedFormParams } from "../generics/paginated.model"

export class SugestaoModel extends PaginatedFormParams{
    cd_sugestao: number
    nm_titulo: string
    ds_sugestao: string
}