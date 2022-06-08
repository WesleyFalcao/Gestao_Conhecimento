import { CategoriaModel } from "../categoria/categoria.model"
import { PaginatedFormParams } from "../generics/paginated.model"

export class ConteudoModel extends PaginatedFormParams {
    categoria: CategoriaModel
    cd_categoria?: number
    cd_conteudo?: number
    ds_conteudo: string = ""
    ds_link: string = ""
    nm_titulo: string = ""
    b_favorito: boolean = false
}