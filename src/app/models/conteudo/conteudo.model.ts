import { CategoriaModel } from "../categoria/categoria.model"

export class objConteudoModel {
    categoria: CategoriaModel
    cd_categoria?: number
    cd_conteudo?: number
    ds_conteudo: string = ""
    ds_link: string = ""
    nm_titulo: string = ""
}