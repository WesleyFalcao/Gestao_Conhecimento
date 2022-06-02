import { PaginatedFormParams } from "../generics/paginated.model"

export class UsuarioParams extends PaginatedFormParams{
    nm_search?: string
    cd_usuario?: number
    nm_usuario?: string
    cd_login?: string
    cd_perfil?: number
    dt_bloqueio?: any
    ds_senha: any
    b_login_ad?: boolean
    perfil?: any
}