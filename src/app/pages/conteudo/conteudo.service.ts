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

    Set_Add_Conteudo(param) {
        if(param.nm_Titulo == null || param.nm_Titulo == "" || param.nm_Descricao == null || param.nm_Descricao == "" || param.ds_Link == null || param.ds_Link == "" || param.nm_Categoria == null || param.nm_Categoria == ""){
            return false
        }
        return this.conteudoRepository.Set_Add_Conteudo(param)
    }
}
