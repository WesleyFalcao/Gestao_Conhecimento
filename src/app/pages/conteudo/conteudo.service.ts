import { Injectable } from "@angular/core";
import { ConteudoRepository } from "src/app/repositories/conteudo.repository";
import { SugestoesRepository } from "src/app/repositories/sugestoes.repository";

@Injectable({
    providedIn: "root"
})
export class ConteudoService {

    constructor(
       private conteudoRepository: ConteudoRepository
    ) {    
    }

    Get_Conteudos() {
        return this.conteudoRepository.Get_Conteudos()
    }

    Get_Conteudo(param) {
        return this.conteudoRepository.Get_Conteudo(param)
    }

    Get_Conteudo_Edit(param) {
        return this.conteudoRepository.Get_Conteudo_Edit(param)
    }

    Set_Edit_User(objparam, idconteudo){
        console.log("objparam.nm_titulo", objparam.nm_titulo)
        if(objparam.nm_titulo == "" || objparam.ds_conteudo == "" || objparam.ds_link == "" || objparam.categoria == ""){
            return false
        }
        return this.conteudoRepository.Set_Edit_User(objparam,idconteudo)
    }

    Set_Add_Conteudo(param) {
        if(param.nm_Titulo == null || param.nm_Titulo == "" || param.nm_Descricao == null || param.nm_Descricao == "" || param.ds_Link == null || param.ds_Link == "" || param.cd_Categoria == null || param.cd_Categoria == undefined){
            return false
        }
        return this.conteudoRepository.Set_Add_Conteudo(param)
    }

    Set_Delete_Conteudo(param){
        return this.conteudoRepository.Set_Delete_Conteudo(param)
    }

    Set_Gravar_Dados(param){
        return this.conteudoRepository.Set_Gravar_Dados(param)
    }

    Set_Favorite(param){
        return this.conteudoRepository.Set_Favorite(param)
    }

    Set_Disfavor(param){
        return this.conteudoRepository.Set_Disfavor(param)
    }
}
