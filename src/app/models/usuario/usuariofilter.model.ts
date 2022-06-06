import { PaginatedFormParams } from "../generics/paginated.model"

export class UsuarioFilter extends PaginatedFormParams{
    cd_usuario?: number
    nm_search?: string
    nm_usuario?: string
    cd_login?: string
    dt_bloqueio?: any
}