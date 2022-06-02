import { Injectable } from "@angular/core";
import { HomeRepository } from "src/app/repositories/home.repository";


import { DataService } from "src/app/services/data.service";

@Injectable({
    providedIn: "root"
})
export class HomeService {

    constructor(
        private homeRepository : HomeRepository  
    ) {    
    }

    Get_Conteudo(param) {
        return this.homeRepository.Get_Conteudo(param)
    }
}
