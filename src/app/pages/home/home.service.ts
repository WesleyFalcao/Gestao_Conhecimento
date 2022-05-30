import { Injectable } from "@angular/core";
import { UsuarioParams } from "src/app/models/usuario/usuario.model";
import { HomeRepository } from "src/app/repositories/home.repository";
import { UsuarioRepository } from "src/app/repositories/usuario.repository";

import { DataService } from "src/app/services/data.service";

@Injectable({
    providedIn: "root"
})
export class HomeService {

    constructor(
        private homeRepository : HomeRepository
        
    ) {    
    }

    Get_Categorias_Listagem() {
        return this.homeRepository.Get_Categorias_Listagem()
    }
    Get_Conteudo(param) {
        return this.homeRepository.Get_Conteudo(param)
    }
}
